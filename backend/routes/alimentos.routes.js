import { Router } from "express";
import { getAlimentos,
    getAlimento , 
    createAlimento,
    updateAlimento,
    deleteAlimento, 
    } from "../controllers/alimentos.controllers.js";

const router = Router();

router.get("/alimento",getAlimentos );
router.get("/alimento/:id", getAlimento);
router.post("/alimento", createAlimento);
router.patch("/alimento",updateAlimento);
router.delete("/alimento/:id", deleteAlimento);

export default router;