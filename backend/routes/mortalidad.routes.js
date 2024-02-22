import { Router} from "express";
import {
    getAllMortalidad,
    createMortalidad,   
    updateMortalidad, 
    deleteMortalidad    
} from '../controllers/mortalidad.controllers.js'
const router = Router();

router.get("/mortalidad", getAllMortalidad);
router.post("/mortalidad",createMortalidad )
router.put("/mortalidad/",updateMortalidad)
router.delete("/mortalidad/:id", deleteMortalidad)

export default router;

