import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole, checkUser } from '../middlewares/checkRole';
import RidesController from '../controllers/RideController';
import HomeController from '../controllers/HomeController';

const router = Router();

//Get rides by region
router.get('/:id([0-9]+)', [checkJwt, checkUser], HomeController.getMetaByUser);
// router.post('/', [], RidesController.newRide);

// //Delete one user
// router.delete(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.deleteUser
// );

export default router;
