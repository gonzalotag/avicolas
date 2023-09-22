
import express from "express";

import { PORT } from "./config.js";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.routes.js"

const app = express();
app.use(cors({ origin:"http://localhost:5173"}));
app.use(express.json());
app.use(usuarioRoutes);
app.listen(PORT);
console.log("EJECUTANDO EN PUERTO", PORT);