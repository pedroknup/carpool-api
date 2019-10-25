import { destinations } from './../entity/destinations';
import { types } from './../entity/types';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { rides } from '../entity/rides';
import { routes } from '../entity/routes';
import { getRegionById } from '../services/rides-service';
import { IRoute } from '../models/route';
import { getUserById } from '../services';
import { users } from '../entity/users';
import { sponsors } from '../entity/sponsors';
import { points } from '../entity/points';
import { messages } from '../entity/messages';
import { pendent_users } from '../entity/pendent_users';
import { confirmed_users } from '../entity/confirmed_users';

class HomeController {
  static getMetaByRegion = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idRegionParam: number = req.params.region;

    if (!idRegionParam) {
      res.status(403).send('Bad Request');
    }
    const foundRegion = getRegionById(idRegionParam);

    if (!foundRegion) {
      res.status(403).send('Região inexistente');
    }
    //Get rides from database
    const typesRepository = getRepository(types);
    const destinationRepository = getRepository(destinations);

    const typesList = await typesRepository.find({ where: { idRegion: idRegionParam } });
    const destinationList = await destinationRepository.find({ where: { idRegion: idRegionParam } });

    //Send the users object
    res.send({ types: typesList, destinations: destinationList });
  };
  static getMetaByUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    try {
      const id = res.locals.jwtPayload.userId;
      const idRegion: number = req.params.id;

      if (!id) {
        res.status(401);
      }
      if (!idRegion) {
        res.status(400);
      }

      const userRepository = getRepository(users);
      let user: users;
      try {
        user = await userRepository.findOneOrFail({
          where: { id: id }
        });
      } catch (err) {
        console.log(err);
        res.status(401).send('Usuário não encontrado');
      }

      const typesRepository = getRepository(types);
      const typesListQuery = typesRepository.find({ where: { idRegion: idRegion }, order: { name: 'ASC' } });

      const routesRepository = getRepository(routes);
      const routesQuery = routesRepository.find({
        where: { idRegion: idRegion, idUser: id },
        relations: ['destination']
      });

      const destinationsRepository = getRepository(destinations);
      const destinationsList = await destinationsRepository.find({
        where: { idRegion: idRegion, isActive: 1 },

        order: { name: 'ASC' }
      });

      const pointsRepository = getRepository(points);
      const pointsList = await pointsRepository.find({
        where: { idRegion: idRegion, isActive: 1 },
        order: { name: 'ASC' }
      });

      const newUser = { ...user };

      const mappedList = [];
      const messagesRepository = getRepository(messages);
      const pendentRepository = getRepository(pendent_users);
      const confirmedRepository = getRepository(confirmed_users);
      const ridesRepository = getRepository(rides);
      const userRides = await ridesRepository.find({ where: { user: user, idRegion: idRegion } });
      const promisses: Promise<void>[] = [];
      for (let i = 0; i < userRides.length; i++) {
        const ride = userRides[i];
        const taskMessages = async () => {
          let messagesList = await messagesRepository.find({ where: { idRide: ride.id }, relations: ['user'] });
          messagesList = messagesList.map(item => {
            return { ...item, isAuthor: item.user.id === id };
          });
          ride.messages = messagesList;
        };
        const taskConfirmed = async () => {
          ride.confirmedUsers = await confirmedRepository.find({
            where: { id_ride: ride.id },
            relations: ['user']
          });
        };
        const taskPendent = async () => {
          ride.pendentUsers = (await pendentRepository.find({
            where: { id_ride: ride.id },
            relations: ['user']
          })).map(item => {
            const routeObj = JSON.parse(JSON.stringify(ride.route));
            let pointFound = routeObj.points.find(point => point.id === item.id_route_point);
            if (!pointFound) {
              pointFound = routeObj.origin.id === item.id_route_point ? routeObj.origin : null;
            }

            return { ...item, point: pointFound };
          });
        };

        const finalPromise = async () => {
          await Promise.all([taskMessages(), taskConfirmed(), taskPendent()]);
          mappedList.push({ ...ride, isDriver: true, isActive: true });
        };

        promisses.push(finalPromise());
      }
      await Promise.all(promisses);

      newUser.rides = mappedList;
      const [userRoutes, typesList] = await Promise.all([routesQuery, typesListQuery]);
      newUser.routes = userRoutes;
      res.send({
        length: userRides.length,
        user: newUser,
        types: typesList,
        destinations: destinationsList,
        points: pointsList
      });
    } catch (e) {
      res.status(500);
    }
  };
}

export default HomeController;
