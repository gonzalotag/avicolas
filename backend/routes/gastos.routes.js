import { Router } from "express";
import {
    getAllGastos,
    getGasto,
    createGasto,
    updateGasto,
    deleteGasto,
} from "../controllers/gastos.controllers.js"

const router = Router();

router.get("/gastos", getAllGastos);
router.get("/gastos/:id", getGasto);
router.post("/gastos", createGasto);
router.patch("/gastos/:id", updateGasto);
router.delete("/gastos/:id", deleteGasto);

export default router;