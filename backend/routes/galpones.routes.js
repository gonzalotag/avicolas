import { Router } from "express";
import { 
    getAllGalpones, 
    getGalpon, 
    createGalpon,
    updateGalpon,
    deleteGalpon 
} from "../controllers/galpones.controllers.js";

const router = Router();

router.get("/galpones",getAllGalpones);
router.get("/galpones/:id",getGalpon);
router.post("/galpones",createGalpon);
router.patch("/galpones/:id",updateGalpon);
router.delete("/galpones/:id",deleteGalpon);

export default router;