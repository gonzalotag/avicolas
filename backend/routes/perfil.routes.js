import { Router } from "express";
import { 
    getPerfiles,
    getPerfil,
    createPerfil,
} from "../controllers/perfil.controllers.js";

const router = Router();

router.get("/perfil" , getPerfiles );
router.get("/perfil/:id",getPerfil);
router.post("/perfil",createPerfil);

export default router;
