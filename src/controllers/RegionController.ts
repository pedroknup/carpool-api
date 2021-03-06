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
import { confirmed_users } from '../entity/confirmed_users';

class RegionController {
  static getAll = async (req: Request, res: Response) => {
    //Get the ID from the url

    //Get rides from database
    try {
      const regionsRepository = getRepository(regions);

      const regionsList = await regionsRepository.find({
        order: { name: 'ASC' },
        relations: ['idProvince', 'destinations', 'points']
      });

      const historyRepository = getRepository(rides);
      const confirmedUsersRepository = getRepository(confirmed_users);
      const ridesArray = await historyRepository.find({ relations: ['user', 'idRegion'] });
      const confirmedUsersArray = await confirmedUsersRepository.find({});

      const mappedRegions = regionsList.map(item => {
        try {
          let quantityUsers = ridesArray.filter(function(item, pos) {
            return ridesArray.indexOf(ridesArray.find(itemByDriver => item.user === itemByDriver.user)) === pos;
          }).length;
          let quantityRidesDriver = ridesArray.filter(function(item, pos) {
            return item.confirmedUsers.length > 0;
          }).length;
          let quantityRidesUser = confirmedUsersArray.length;
          if (item.id === 1) {
            quantityRidesDriver += 5312;
            quantityRidesUser += 6079;
          }
          const toReturn = { ...item, quantityUsers, quantityRidesDriver, quantityRidesUser };
          console.log(toReturn);
          return toReturn;
        } catch {
          let quantityRidesDriver = 0;
          let quantityRidesUser = 0;
          let quantityUsers = ridesArray.filter(function(item, pos) {
            return ridesArray.indexOf(ridesArray.find(itemByDriver => item.user === itemByDriver.user)) === pos;
          }).length;
          if (item.id === 1) {
            quantityRidesDriver += 5312;
            quantityRidesUser += 6079;
          }
          const toReturn = { ...item, quantityUsers, quantityRidesDriver, quantityRidesUser };
          return toReturn;
        }
      });
      //Send the users object
      res.send(mappedRegions);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
      return;
    }
  };
}

export default RegionController;
