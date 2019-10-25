import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole, checkUser } from "../middlewares/checkRole";
import RidesController from "../controllers/RideController";

const router = Router();

//Get rides by region
router.get('/:id([0-9]+)', [checkJwt, checkUser], RidesController.listByRegion);
router.post('/:id([0-9]+)', [checkJwt, checkUser], RidesController.sendRequest);
router.post('/', [], RidesController.newRide);




// //Edit one user
// router.patch(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.editUser
// );

// //Delete one user
// router.delete(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.deleteUser
// );

export default router;
