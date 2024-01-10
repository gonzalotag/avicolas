
import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import perfilRoutes from "./routes/perfil.routes.js"
import rolRoutes from "./routes/rol.routes.js"
import medicinaRoutes from "./routes/medicinas.routes.js"


// para manejar el cache-control 'stale-while-revalidate=604800'
const corsOptions ={
    origin:"http://localhost:5173",
    allowedHeaders:["Content-Type","Authorization","cache-control"],
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    optionSuccessStatus:204,
};

const app = express();
// const cors = require('cors');
// app.use(cors());
app.use(cors(corsOptions)); //{origin:"http://locallhost:5173"}
app.use(express.json());
app.use(perfilRoutes);
app.use(rolRoutes);
app.use(medicinaRoutes);
app.listen(PORT);

console.log("EJECUTANDO EN PUERTO", PORT);
