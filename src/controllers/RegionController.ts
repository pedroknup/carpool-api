import { provinces } from './../entity/provinces';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { rides } from '../entity/rides';
import { getRegionById } from '../services/rides-service';
import { IRoute } from '../models/route';
import { getUserById } from '../services';
import { regions } from '../entity/regions';

class RegionController {
  static getAll = async (req: Request, res: Response) => {
    //Get the ID from the url

    //Get rides from database
    try {
      const regionsRepository = getRepository(regions);

      const regionsList = await regionsRepository.find({
        order: { name: 'ASC' },
        relations: ['province']
      });

      //Send the users object
      res.send(regionsList);
    } catch (e) {
      res.status(500).send(e);
      return;
    }
  };
}

export default RegionController;
