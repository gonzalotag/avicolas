import { Router } from "express";
import { 
    getPerfiles,
    getPerfil,
    createPerfil,
    updatePerfil,
    deletePerfil,
    getUserByParams,
    getPerfilesByRol
} from "../controllers/perfil.controllers.js";


const router = Router();

router.get("/perfil" , getPerfiles );
router.get("/perfil/:id",getPerfil);
router.post("/perfil",createPerfil);
router.patch("/perfil/:id",updatePerfil);
router.delete("/perfil/:id",deletePerfil);


router.get("/perfil/getEmpleadoByRol/:id_rol", getPerfilesByRol);
router.get("/perfil/get")

router.post("/login", getUserByParams)

export default router;
