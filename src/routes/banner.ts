import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole, checkUser } from '../middlewares/checkRole';
import RidesController from '../controllers/RideController';
import HomeController from '../controllers/HomeController';
import BannerController from '../controllers/BannerController';

const router = Router();

router.get('/:id([0-9]+)', [], BannerController.listByRegion);

export default router;
