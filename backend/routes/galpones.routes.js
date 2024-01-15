import { Router } from "express";
import { 
    getGalpones, 
    getGalpon, 
    createGalpon,
    updateGalpon,
    deleteGalpon 
} from "../controllers/galpones.controllers.js";

const router = Router();

router.get("/galpones",getGalpones);
router.get("/galpones/:id",getGalpon);
router.post("/galpones",createGalpon);
router.patch("/galpones/:id",updateGalpon);
router.delete("/galpones/:id",deleteGalpon);

export default router;