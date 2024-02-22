import {Router} from "express";
import {
    getAllLotes,
    getLote,
    createLote,
    updateLote,
    deleteLote
} from "../controllers/lotes.controllers.js";

const router = Router();
router.get("/lote", getAllLotes); //Lista todos los lotes
router.get("/lote/:id", getLote); //Devuelve el lote con el
router.post("/lote", createLote); //Crea un nuevo lote en la BD
router.patch("/lote/:id",updateLote);
router.delete('/lote/:id', deleteLote);
export default router;