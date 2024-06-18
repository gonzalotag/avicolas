
import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import perfilRoutes from "./routes/perfil.routes.js"
import rolRoutes from "./routes/rol.routes.js"
import medicinasRoutes from "./routes/medicinas.routes.js"
import galponRoutes from "./routes/galpones.routes.js"
import alimentosRoutes from "./routes/alimentos.routes.js"
import almacenRoutes from "./routes/almacen.routes.js"
import lotesRoutes from "./routes/lotes.routes.js"  
import mortalidadRoutes from "./routes/mortalidad.routes.js"
import gastosRoutes from "./routes/gastos.routes.js"
import pesoRoutes from "./routes/peso.routes.js"
import produccionRoutes from "./routes/produccion.routes.js" 
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
app.use(cors(corsOptions)); 
// {origin:"http://locallhost:5173"}
app.use(express.json());
app.use(perfilRoutes);
app.use(rolRoutes);
app.use(medicinasRoutes);
app.use(galponRoutes);
app.use(alimentosRoutes);
app.use(lotesRoutes);
app.use(almacenRoutes);
app.use(mortalidadRoutes);
app.use(gastosRoutes);
app.use(pesoRoutes);
app.use(produccionRoutes);

app.listen(PORT);
app.use ((err, req, res,next)=>{
    console.error(err.stack);
    res.status(500).send("algo va mal");
});
console.log("EJECUTANDO EN PUERTO", PORT);
