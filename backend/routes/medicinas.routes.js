import { Router } from "express";
import { 
    getAllMedicinas, 
    getMedicina, 
    createMedicinas, 
    updateMedicinas, 
    deleteMedicina  
} from "../controllers/medicinas.controllers.js";

const router = Router();

router.get("/medicina",getAllMedicinas);
router.get("/medicina/:id",getMedicina);
router.post("/medicina",createMedicinas);
router.patch("/medicina",updateMedicinas);
router.delete("/medicina/:id",deleteMedicina) ;

export default router;