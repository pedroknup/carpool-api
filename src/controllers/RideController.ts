import { Request, Response } from 'express';
import { getRepository, MoreThan, Equal, Between } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { rides } from '../entity/rides';
import { getRegionById } from '../services/rides-service';
import { IRoute } from '../models/route';
import { getUserById } from '../services';
import { routes } from '../entity/routes';
import { pendent_users } from '../entity/pendent_users';
import { users } from '../entity/users';
import { confirmed_users } from '../entity/confirmed_users';
import { messages } from '../entity/messages';
import { IConfirmedUser } from '../models/confirmed-user';
import { TIME_TOLERANCE } from '../constants/index';
import { isRideExpired } from '../util/ride';
const moment = require('moment');
class RideController {
  static listByRegion = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idRegionParam: number = req.params.id;
    if (!idRegionParam) {
      res.status(403).send('Bad Request');
    }
    const foundRegion = getRegionById(idRegionParam);

    if (!foundRegion) {
      res.status(403).send('Região inexistente');
    }
    //Get rides from database

    const ridesRepository = getRepository(rides);
    const now = new Date();
    const ridesList = await ridesRepository.find({
      where: { idRegion: idRegionParam, expires_at: MoreThan(now) },
      order: { time: 'ASC' },
      relations: ['user']
    });

    const idUser = res.locals.jwtPayload.userId;

    const messagesRepository = getRepository(messages);
    const pendentRepository = getRepository(pendent_users);
    const confirmedRepository = getRepository(confirmed_users);
    const pendentUsers = await pendentRepository.find({
      where: {
        id_user: idUser
      },
      relations: ['user']
    });
    const confirmedUsers = await confirmedRepository.find({
      where: {
        id_user: idUser
      },
      relations: ['user']
    });
    console.log(confirmedUsers);

    const mappedList = [];
    for (let i = 0; i < ridesList.length; i++) {
      const ride = ridesList[i];
      const newRide = { ...ride };
      if (ride.user.id == idUser) {
        newRide.messages = await messagesRepository.find({ where: { ride: newRide.id } });
        newRide.confirmedUsers = await confirmedRepository.find({
          where: { id_ride: newRide.id },
          relations: ['user', 'ride']
        });
        newRide.pendentUsers = await pendentRepository.find({
          where: { id_ride: newRide.id },
          relations: ['user', 'ride']
        });
        mappedList.push({ ...newRide, isDriver: true, isActive: true });
      } else {
        const foundPendent = pendentUsers.find(pendent => pendent.ride.id === newRide.id);
        if (foundPendent) {
          mappedList.push({ ...newRide, isPendent: true });
        } else {
          const foundConfirmed = confirmedUsers.find(confirmed => confirmed.ride.id === newRide.id);
          if (foundConfirmed) {
            newRide.messages = await messagesRepository.find({ where: { ride: newRide.id } });
            mappedList.push({ ...newRide, isActive: true });
          } else {
            if (newRide.time > now) mappedList.push({ ...newRide });
          }
        }
      }
    }

    res.send(mappedList);
    //Send the users object
  };

  static getRide = async (req: Request, res: Response) => {
    try {
      const idRide: number = req.params.id;
      const ridesRepository = getRepository(rides);
      const idUser = res.locals.jwtPayload.userId;
      let ride: rides;
      try {
        ride = await ridesRepository.findOneOrFail({
          where: { id: idRide },
          relations: ['user', 'confirmedUsers', 'confirmedUsers.user', 'pendentUsers', 'messages', 'messages.user']
        });
      } catch (err) {
        res.status(402).send('Carona não encontrada');
        return;
      }

      let user: users;
      try {
        const userRepository = getRepository(users);
        user = await userRepository.findOneOrFail({
          where: { id: idUser }
        });
      } catch (err) {
        res.status(401).send('Você foi desconectado.');
        return;
      }

      const mappedRide = {
        ...ride,
        messages: ride.messages.map(message => ({
          ...message,
          isAuthor: message.user.id == user.id
        })),
        isDriver: true,
        isActive: true,
        confirmedUsers: ride.confirmedUsers.map(confirmed => {
          const route = JSON.parse(JSON.stringify(ride.route));
          let foundPoint = route.points.find(point => point.id === confirmed.id_route_point);
          if (!foundPoint) {
            if (route.origin.id === confirmed.id_route_point) foundPoint = route.origin;
            else if (route.destination.id === confirmed.id_route_point) foundPoint = route.destination;
          }
          if (foundPoint) return { ...confirmed, point: foundPoint };
          else return null;
        })
      };

      if (isRideExpired(ride)) {
        res.status(402).send('Essa carona expirou.');
        return;
      }

      let isUserInTheRide = false;
      if (ride.user.id === user.id) isUserInTheRide = true;
      else if (ride.confirmedUsers.find(item => item.user.id === user.id)) isUserInTheRide = true;
      if (!isUserInTheRide) {
        res.status(402).send('Você não está nesta carona');
        return;
      }

      res.status(200).send(mappedRide);
      return;
    } catch (e) {
      res.status(500).send('Erro interno no servidor' + e);
      return;
    }
  };

  static sendRequest = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idRide: number = req.params.id;
    let { idPoint, quantity } = req.body;
    if (!idRide || !idPoint || !quantity) {
      console.log(req.body);
      res.status(403).send('Bad Request');
      return;
    }
    const ridesRepository = getRepository(rides);

    const idUser = res.locals.jwtPayload.userId;
    let ride: rides;
    try {
      ride = await ridesRepository.findOneOrFail({
        where: { id: idRide },
        relations: ['user']
      });
    } catch (err) {
      res.status(400).send('Carona não encontrada');
      return;
    }

    if (ride.spots < quantity) {
      res
        .status(400)
        .send('Esta carona possui menos vagas que o solicitado. Por favor, tente novamente com uma menor quantidade.');
      return;
    }
    if (ride.expires_at <= new Date()) {
      res.status(402).send('Esta carona expirou');
      return;
    }

    const pendentRepository = getRepository(pendent_users);
    try {
      const foundRequestSameRide = await pendentRepository.find({ where: { id_user: idUser, id_ride: idRide } });
      if (foundRequestSameRide.length > 0) {
        res.status(402).send(`Você já solicitou nesta oferta de carona.`);
        return;
      }
    } catch {}

    const confirmedRepository = getRepository(confirmed_users);
    try {
      const confirmedMatches = await confirmedRepository.find({ user: idUser });
      if (confirmedMatches.length > 0) {
        res
          .status(402)
          .send(
            `Não é possível ter mais de uma carona confirmada ao mesmo tempo. Você tem outra carona confirmada com ${ride.user.full_name}`
          );
        return;
      }
    } catch {
      res.status(500).send('Erro interno no servidor. Por favor, tente novamente mais tarde.');
      return;
    }

    const userRepository = getRepository(users);
    let user: users;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: idUser }
      });
    } catch (err) {
      res.status(401).send('Você foi desconectado.');
      return;
    }

    if (user.id == ride.user.id) {
      res.status(402).send('Você não pode mandar solicitação de carona para você mesmo!');
      return;
    }

    const request = {
      id_ride: idRide,
      id_user: idUser,
      quantity,
      id_route_point: idPoint,
      created_at: new Date()
    };

    try {
      const pendentUsersRepository = getRepository(pendent_users);
      await pendentUsersRepository.save(request);
      res.status(200).send('Sucesso');
    } catch {
      res.status(500).send('Erro interno no servidor. Por favor, tente novamente mais tarde');
      return;
    }
  };
  static UpdateRideSpots = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idRide: number = req.params.id;
    let { spots } = req.body;
    if (!idRide || spots === undefined || spots < 0) {
      console.log(req.body);
      res.status(403).send('Bad Request');
      return;
    }
    const ridesRepository = getRepository(rides);

    const idUser = res.locals.jwtPayload.userId;
    let ride: rides;
    try {
      ride = await ridesRepository.findOneOrFail({
        where: { id: idRide },
        relations: ['user', 'confirmedUsers']
      });
    } catch (err) {
      res.status(402).send('Carona não encontrada');
      return;
    }
    const totalConfirmed = ride.confirmedUsers.reduce((a, b) => a + b.quantity, 0);

    const userRepository = getRepository(users);
    let user: users;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: idUser }
      });
    } catch (err) {
      res.status(401).send('Você foi desconectado.');
      return;
    }

    if (ride.user.id != idUser) {
      res.status(402).send(`Essa carona não é sua!`);
      return;
    }
    if (spots + totalConfirmed >= 5) {
      res.status(400).send(`Número de vagas disponíveis inválido. Escolha um número menor que ${5 - totalConfirmed}`);
      return;
    }
    if (ride.expires_at <= new Date()) {
      res.status(402).send('Esta carona expirou');
      return;
    }

    ridesRepository
      .update(ride.id, { spots: spots })
      .then(() => {
        res.status(200).send('Sucesso');
        return;
      })
      .catch(() => {
        res.status(500).send('Erro interno no servidor. Por favor, tente novamente mais tarde.');
        return;
      });
  };

  static confirmRequest = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idRequest: number = req.params.id;
    const ridesRepository = getRepository(rides);
    const requestsRepository = getRepository(pendent_users);
    const idUser = res.locals.jwtPayload.userId;
    let requestRide: pendent_users;
    try {
      requestRide = await requestsRepository.findOneOrFail({
        where: { id: idRequest },
        relations: ['user', 'ride']
      });
    } catch (err) {
      res.status(402).send('Essa solicitação não existe mais ou expirou');
      return;
    }
    let ride: rides;
    try {
      ride = await ridesRepository.findOneOrFail({
        where: { id: requestRide.ride.id },
        relations: ['user']
      });
    } catch (err) {
      res.status(402).send('Carona não encontrada');
      return;
    }

    if (ride.spots < requestRide.quantity) {
      res.status(403).send('Esta carona possui menos vagas que o solicitado.');
      return;
    }
    ///! TODO: DEV PURPOSES
    // if (ride.expires_at <= new Date()) {
    //   res.status(402).send('Esta carona expirou');
    //   return;
    // }

    const confirmedRepository = getRepository(confirmed_users);
    try {
      const confirmedMatches = await confirmedRepository.find({
        where: { user: requestRide.user.id },
        relations: ['ride']
      });
      confirmedMatches.forEach(item => {
        const now = new Date();
        if (item.ride.expires_at <= now) {
          res.status(402).send(`Este caroneiro já foi confirmado em outra carona.`);
          requestsRepository
            .createQueryBuilder()
            .delete()
            .from(pendent_users)
            .where('id = :id', { id: idRequest })
            .execute();
          return;
        }
      });
    } catch {
      res.status(500).send('Erro interno no servidor. Por favor, tente novamente mais tarde.');
      return;
    }
    let { time } = req.body;
    if (!time) {
      res.status(403).send('É obrigatório informar o horário ao confirmar uma carona.');
      return;
    }
    let timeParsed: Date;
    try {
      timeParsed = new Date(time);
    } catch {
      res.status(403).send('Erro ao converter o campo Data');
      return;
    }
    // if (time <= new Date() || time >= ride.time) {
    //   res.status(402).send('Horário inválido');
    //   return;
    // }

    const userRepository = getRepository(users);
    let user: users;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: idUser }
      });
    } catch (err) {
      res.status(401).send('Você foi desconectado.');
      return;
    }

    if (user.id != ride.user.id) {
      res.status(402).send('Você não pode confirmar/cancelar caroneiros em uma carona que não é sua!');
      return;
    }
    const finalTime = new Date();
    finalTime.setDate(ride.time.getDate());
    finalTime.setMonth(ride.time.getMonth());
    finalTime.setFullYear(ride.time.getFullYear());
    finalTime.setHours(timeParsed.getHours());
    finalTime.setMinutes(timeParsed.getMinutes());
    console.log('idUser:' + requestRide.user.id);
    const confirmed = {
      ride,
      user: requestRide.user,
      id_route_point: requestRide.id_route_point,
      quantity: requestRide.quantity,
      time: finalTime,
      created_at: new Date()
    };

    requestsRepository
      .createQueryBuilder()
      .delete()
      .from(pendent_users)
      .where('id = :id', { id: idRequest })
      .execute();
    try {
      const newSpots = ride.spots - confirmed.quantity;
      await ridesRepository.update(ride.id, { spots: newSpots });
      await confirmedRepository.save(confirmed);
      res.status(200).send('Sucesso');
    } catch (e) {
      console.log(e);
      res.status(500).send('Erro interno no servidor. Por favor, tente novamente mais tarde');
      return;
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the ride from database
    const ridesRepository = getRepository(rides);
    try {
      const ride = await ridesRepository.findOneOrFail({ where: { id } });
      res.send(ride);
    } catch (error) {
      res.status(404).send('Carona não encontrada');
    }
  };

  static newRide = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { time, type, spots, idUser, route, outgoing, description } = req.body.ride;
    let regionId = req.body.regionId;
    const rideRoute = new routes();
    rideRoute.name = route.name;
    rideRoute.idUser = idUser;
    rideRoute.origin = route.origin;
    rideRoute.destination = route.destination;
    rideRoute.points = route.points;
    rideRoute.idRegion = regionId;

    if (spots <= 0 || !spots) {
      res.status(400).send('Número de vagas inválido.');
      return;
    }
    let timeParsed: Date;
    try {
      timeParsed = new Date(time);
    } catch {
      res.status(400).send('Horário Inválido.');
      return;
    }
    if (timeParsed <= new Date()) {
      res.status(400).send('Horário Inválido.');
      return;
    }

    if (route.shouldSave) {
      const routeRepository = getRepository(routes);
      await routeRepository.save(rideRoute);
    }
    if (!!!timeParsed) {
      res.status(400).send('Horário Inválido.');
      return;
    }
    const now = new Date();
    const expirationTime: Date = new Date(timeParsed);
    expirationTime.setMinutes(timeParsed.getMinutes() + (outgoing ? 25 : 45));
    console.log('user' + idUser);
    let rideToAdd = new rides();
    rideToAdd.time = timeParsed;
    rideToAdd.type = type;
    rideToAdd.spots = spots;
    rideToAdd.outgoing = outgoing;
    rideToAdd.description = description;
    rideToAdd.user = idUser;
    rideToAdd.route = rideRoute;
    rideToAdd.created_at = now;
    rideToAdd.expires_at = expirationTime;
    const errors = await validate(rideToAdd);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const ridesRepository = getRepository(rides);
    try {
      //TODO: Check if user is in another ride in the same time
      const timeMore10Minutes = new Date(timeParsed);
      timeMore10Minutes.setMinutes(timeMore10Minutes.getMinutes() + 15);

      const userRides = await ridesRepository.find({ where: { user: idUser } });
      const activeRides = userRides.filter(item=>{
        return !isRideExpired(item);
      })
      if (activeRides.length > 5) {
        res
          .status(400)
          .send(
            'Você atingiu o limite de caronas simultaneamente ofertadas. Tente novamente quando você tiver menos que 5 caronas ativas.'
          );
        return;
      } else {
        const rideSameTime = await ridesRepository.find({ where: { time: Between(timeParsed, timeMore10Minutes) } });
        if (rideSameTime.length > 0) {
          res.status(400).send('Você já tem uma carona ofertada nesse horário (tolerância de 10 minutos).');
        } else {
          await ridesRepository.save(rideToAdd);
          res.status(200).send('Carona criada');
        }
      }
    } catch (e) {
      res.status(409).send(e);
      return;
    }
  };

  // static editUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   //Get values from the body
  //   const { username, role } = req.body;

  //   //Try to find user on database
  //   const userRepository = getRepository(User);
  //   let user;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     //If not found, send a 404 response
  //     res.status(404).send("User not found");
  //     return;
  //   }

  //   //Validate the new values on model
  //   user.username = username;
  //   user.role = role;
  //   const errors = await validate(user);
  //   if (errors.length > 0) {
  //     res.status(400).send(errors);
  //     return;
  //   }

  //   //Try to safe, if fails, that means username already in use
  //   try {
  //     await userRepository.save(user);
  //   } catch (e) {
  //     res.status(409).send("username already in use");
  //     return;
  //   }
  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };

  // static deleteUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   const userRepository = getRepository(User);
  //   let user: User;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     res.status(404).send("User not found");
  //     return;
  //   }
  //   userRepository.delete(id);

  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };
}

export default RideController;
