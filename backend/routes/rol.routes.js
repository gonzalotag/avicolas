import { Router } from "express";
import{
    getAllRoles,
    getRol
}from "../controllers/rol.controllers.js";

const router = Router();

router.get('/rol/:id', getRol);

router.get('/rol', getAllRoles)

export default router;