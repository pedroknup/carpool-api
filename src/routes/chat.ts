import { Router } from 'express';
import RegionController from '../controllers/RegionController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkUser } from '../middlewares/checkRole';
import ChatController from '../controllers/ChatController';

const router = Router();

//Get rides by region
router.post('/:id([0-9]+)', [checkJwt, checkUser], ChatController.postMessage);

export default router;
