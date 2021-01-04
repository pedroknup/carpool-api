import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { rides } from '../entity/rides';
import { getRegionById } from '../services/rides-service';
import { IRoute } from '../models/route';
import { getUserById } from '../services';
import { routes } from '../entity/routes';
import { sponsors } from '../entity/sponsors';

class BannerController {
  static listByRegion = async (req: Request, res: Response) => {
    try {
      const id: number = req.params.id;

      const sponsorRepository = getRepository(sponsors);
      const banners = await sponsorRepository.find({
        where: [{ idRegion: id }, { idRegion: null }],
        order: { order: 'ASC' }
      });
      console.log("banners", banners)
      res.send(banners);
    } catch {
      res.send(500);
    }
  };
}

export default BannerController;
