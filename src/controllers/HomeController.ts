import { destinations } from './../entity/destinations';
import { types } from './../entity/types';
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { rides } from "../entity/rides";
import { getRegionById } from "../services/rides-service";
import { IRoute } from "../models/route";
import { getUserById } from "../services";


class HomeController {
  static getMetaByRegion = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idRegionParam: number  = req.params.region;

    if (!idRegionParam){
      res.status(403).send("Bad Request");
    }
    const foundRegion = getRegionById(idRegionParam)

    if (!foundRegion){
      res.status(403).send("Região inexistente");
    }
    //Get rides from database
    const typesRepository = getRepository(types);
    const destinationRepository = getRepository(destinations);
    
    const typesList = await typesRepository.find(
      { where: { idRegion:  idRegionParam } }
    );
    const destinationList = await destinationRepository.find(
      { where: { idRegion:  idRegionParam } }
    );

    //Send the users object
    res.send({types: typesList, destinations: destinationList});

  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the ride from database
    const ridesRepository = getRepository(rides);
    try {
      const ride = await ridesRepository.findOneOrFail({where: {id}});
      res.send(ride);
    } catch (error) {
      res.status(404).send("Carona não encontrada");
    }
  };
}

export default HomeController;
