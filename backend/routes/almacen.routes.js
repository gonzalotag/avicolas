import { Router } from "express";
import { getAlmacen,
        getAlmacenes } from "../controllers/almacen.controllers.js";

const router = Router();

router.get("/almacen", getAlmacenes);
router.get("/almacen:id",getAlmacen);

export default router;