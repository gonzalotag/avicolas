import { Router } from "express";
import { createGalpon, deleteGalpon, getGalpon, getGalpones, updateGalpon } from "../controllers/galpones.controllers";

const router = Router();

router.get("/galon",getGalpones);
router.get("/galon:id",getGalpon);
router.post("/galon",createGalpon);
router.patch("/galon:id",updateGalpon);
router.delete("/galon:id",deleteGalpon);

export default router;