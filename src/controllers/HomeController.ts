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
import { isRideExpired } from '../util/ride';

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
      const ridesRepository = getRepository(rides);
      const userRides = await ridesRepository.find({
        where: { user: user, idRegion: idRegion },
        relations: ['confirmedUsers', 'confirmedUsers.user', 'pendentUsers', 'messages', 'messages.user']
      });

      //! TODO: optimize output (map)
      newUser.rides = userRides.filter(item => {
        return !isRideExpired(item);
      });
      newUser.rides = newUser.rides.map(item => {
        return {
          ...item,
          messages: item.messages.map(message => ({
            ...message,
            isAuthor: message.user.id == user.id
          })),
          isDriver: true,
          isActive: true,
          confirmedUsers: item.confirmedUsers.map(confirmed => {
            const route = JSON.parse(JSON.stringify(item.route));
            let foundPoint = route.points.find(point => point.id === confirmed.id_route_point);
            if (!foundPoint) {
              if (route.origin.id === confirmed.id_route_point) foundPoint = route.origin;
              else if (route.destination.id === confirmed.id_route_point) foundPoint = route.destination;
            }
            if (foundPoint) return { ...confirmed, point: foundPoint };
            else return null;
          })
        };
      });
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
