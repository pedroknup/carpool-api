import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { rides } from '../entity/rides';
import { getRegionById } from '../services/rides-service';
import { IRoute } from '../models/route';
import { getUserById } from '../services';
import { routes } from '../entity/routes';

class RideController {
  static listByRegion = async (req: Request, res: Response) => {
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
    const ridesRepository = getRepository(rides);
    const ridesList = await ridesRepository.find({ where: { idRegion: idRegionParam } });

    //Send the users object
    res.send(ridesList);
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
    let { time, type, spots, idUser, route, outgoing } = req.body.ride;
    let token = req.body.token;
    let regionId = req.body.regionId;
    const foundUser = await getUserById(idUser);

    const rideRoute = new routes();
    rideRoute.name = route.name;
    rideRoute.idUser = idUser;
    rideRoute.origin = route.origin;
    rideRoute.idDestination = route.destination.id;
    rideRoute.points = route.route;
    rideRoute.idRegion = regionId;

    if (route.shouldSave) {
      const routeRepository = getRepository(routes);
      console.log('To save' + JSON.stringify(rideRoute));
      await routeRepository.save(rideRoute);
    }
    const now = new Date();
    const expirationTime: Date = time;
    // expirationTime.setMinutes(expirationTime.getMinutes() + 25);
    console.log('user' + idUser);
    let rideToAdd = new rides();
    rideToAdd.time = time;
    rideToAdd.type = type;
    rideToAdd.spots = spots;
    rideToAdd.outgoing = outgoing;
    rideToAdd.idUser = idUser;
    rideToAdd.route = rideRoute;
    rideToAdd.created_at = now;
    rideToAdd.expires_at = now;
    //Validade if the parameters are ok
    const errors = await validate(rideToAdd);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the username is already in use
    const ridesRepository = getRepository(rides);
    try {
      await ridesRepository.save(rideToAdd);
    } catch (e) {
      res.status(409).send(e);
      return;
    }

    //If all ok, send 201 response
    res.status(201).send('Carona criada');
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
