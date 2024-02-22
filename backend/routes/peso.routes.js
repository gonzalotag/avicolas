import { Router } from "express";
import {
    getAllPeso,
    getPeso,
    createPeso,
    updatePeso,
    deletePeso
} from "../controllers/peso.controllers.js"
const router = Router();

router.get("/peso", getAllPeso);
router.get("/peso/:id", getPeso);
router.post("/peso",createPeso);
router.patch("/peso/:id",updatePeso);
router.delete("/peso/:id",deletePeso);


export default router;