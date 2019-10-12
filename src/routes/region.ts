import { Router } from "express";
import RegionController from "../controllers/RegionController";

const router = Router();

//Get rides by region
router.get("/", [], RegionController.getAll);

export default router;
