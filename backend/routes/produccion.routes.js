import { Router } from "express";
import {
    getAllProduccion,
    getProduccionItem,
    createProduccion,
    updateProduccion,
    deleteProduccion,
} from "../controllers/produccion.controllers.js"

const router = Router();

router.get("/produccion", getAllProduccion);
router.get("/produccion/:id", getProduccionItem);
router.post("/produccion", createProduccion);
router.patch("/produccion/:id", updateProduccion);
router.delete("/produccion/:id", deleteProduccion);

export default router;