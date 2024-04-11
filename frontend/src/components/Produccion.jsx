import "../assets/css/produccion.css"
import React,{useState, useEffect} from "react"
import { getAllGalpones,getGalpon } from "../api/galpones.api"
import { getAllMortalidad, postMortalidad } from "../api/mortalidad.api"
import { getAllAlimentos } from "../api/alimentos.api"
import { getAllMedicinas } from "../api/medicinas.api"
import { getAllGastos, postGasto } from "../api/gastos.api"
import { FormatFecha } from "./FormatFecha"
import { getPerfilesByRol } from "../api/perfil.api"
import { getAllPeso, postPeso } from "../api/peso.api"
import { postProduction } from "../api/produccion.api"
import { getAllLotes } from "../api/lotes.api"
import TablaProduccion from "./TablaProduccion"

function Produccion (){
    const [selectGalpon,setSelectGalpon]=useState('');
    const [galponProduccion, setGalponProduccion]=useState([]);
    const [actividadControl,setActividadControl]=useState('');
    const [mostrarMortalidad, setMostrarMortalidad]=useState(false);
    const [detallesGalpon,setDetallesGalpon]= useState(null);
    const [dataAlimento,setDataAlimento]=useState([]);
    const [dataMed,setDataMed]= useState([]);
    const [asignEmpleado,setAsignEmpleado]=useState([]);
    const [dataGasto,setDataGasto] = useState([]);
    const [dataPeso,setDataPeso]=useState([]);
    const [dataLote, setDataLote] = useState([]);
    const [isLoading,setIsloading]=useState(false);
    

    const [seleccionPorSeccion, setSeleccionPorSeccion]=useState({
        Alimentacion:[],
        Medicamentos:[],
        Mortalidad:[],
        Gastos: [],
        Peso : [],
        Empleado:[],
        Galpon:[],
    })

    useEffect(()=>{  
        obtenerGalpon();
        obtenerDatosEmpleados();
    },[]);

    const handleControlButton = async (control)=>{
        setIsloading(true);
        setActividadControl(control);
        try {
            switch (control) {
                case "Mortalidad":
                    const mortalData = await getAllMortalidad();
                    setMostrarMortalidad(mortalData);
                break;
                case "Alimentacion":
                    const infoAlimento = await getAllAlimentos();
                    setDataAlimento(infoAlimento);
                break;
                case "Medicaciones":
                    const medicas = await getAllMedicinas();
                    setDataMed(medicas);
                break;
                case "Empleado":
                    const perfilEmpleado = await obtenerDatosEmpleados();
                    
                break;
                case "Peso":
                    const peso = await getAllPeso();
                    setDataPeso(peso);
                break;
                case "Gastos":
                    const gastoRegistro = await getAllGastos();
                    const gastosArray = Array.isArray(gastoRegistro)
                    ? gastoRegistro: gastoRegistro.data;
                    setDataGasto(gastosArray);
                break;
                case "Lote":
                    const lotes = await getAllLotes();
                    setDataLote(lotes);
                break;
                default:
                break;
            }
        }catch (error){
            console.error("Error en obtener datos", error);
        }finally{
            setIsloading(false);
        }
    }

    async function obtenerGalpon(){
        const result = await getAllGalpones();
        setGalponProduccion(result.data || []);
    }

    const handleMapGalpon = async (e) => {
        const selectGalponId = e.target.value;
        setSelectGalpon(selectGalponId)
        try{
            const galponDetalle = await getGalpon(selectGalponId);
            setDetallesGalpon(galponDetalle.data);
        }catch{
            console.error("Error al obtener detalles de galpon", error);
        }
    }

    const obtenerDatosEmpleados = async () =>{
        try {
            const idRolEmp = 4;
            const empleados = await getPerfilesByRol(idRolEmp);
            setAsignEmpleado(empleados);
        } catch (error) {
            console.log("error al obtener datos empleados", error);
            setAsignEmpleado([]);
        }
    }

    const organizarSelecciones =() =>{
        const selectOrganize = [];
        for (const seccion in seleccionPorSeccion) {
            seleccionPorSeccion[seccion].forEach(seleccion =>{
                selectOrganize.push({
                    seccion,
                    fila: seleccion.fila,
                });
            }); 
        }
        return selectOrganize;
    }

    const handleSeleccion = (fila, seccion) =>{
        const seccionesPermitidas =["Alimentacion", "Medicaciones", "Mortalidad", "Peso", "Gastos", "Empleado", "Lote"];
        if(seccionesPermitidas.includes(seccion)){
        const nuevaSeleccion = {fila, seccion};
        setSeleccionPorSeccion(prevState =>{
            const seleccionesPorSeccionActualizadas = {...prevState};
            if (!seleccionesPorSeccionActualizadas.hasOwnProperty(seccion)) {
                seleccionesPorSeccionActualizadas[seccion]=[];
            }
            const existe = seleccionesPorSeccionActualizadas[seccion].some(item =>item.fila.id === fila.id);
            if (!existe) {
                seleccionesPorSeccionActualizadas[seccion].push(nuevaSeleccion);
            }
                return seleccionesPorSeccionActualizadas;
            });
        }
    }
    
    const handleEliminarSeleccion = (filaId,seccion) =>{
        setSeleccionPorSeccion(prevState =>{
            const nuevaSeleccionPorSeccion = {...prevState};
            const index= nuevaSeleccionPorSeccion[seccion].findIndex(item => item.fila.id === filaId);
            if (index !== -1) {
                nuevaSeleccionPorSeccion[seccion].splice(index,1);
            }
            return nuevaSeleccionPorSeccion;
        });
    }

    const guardarProd = async()=>{
        try {
            await postProduction(seleccionPorSeccion);
            seleccionPorSeccion({
                Alimentos:[],
                Medicamentos:[],
                Mortalidad:[],
                Gastos:[],
                Peso:[],
                Empleado:[],
                Lote:[],
            });
        } catch (error) {
            console.log("Error al guardar los datos", error);
        }
    }
    
    return (
    <div className="areaProduccion">
        <div className="galponSelector">
            <label ><h2>Seleccionar Galpon</h2></label>
                <select
                value={selectGalpon}
                onChange={handleMapGalpon}
                >
                <option value="">Seleccionar Galpon</option>
                {galponProduccion.map((data,index)=>(
                    <option key={index} value={data.id} >
                        {data.num_galpon}
                      </option> 
                ))}
            </select>
        </div>
        <table>
            <thead>
                    <tr>
                        <th colSpan={5}>
                            <h3>Detalle de Galpon Seleccionado</h3>
                        </th>
                    </tr>
                        <tr>
                        <th>N° Galpón</th>
                        <th>Capacidad</th>
                        <th>Disponibilidad</th>
                        <th>Fecha</th>
                        <th>Selección</th>
                    </tr>
            </thead>
            <tbody>
                {detallesGalpon && detallesGalpon.map((Galpon,index) => 
                <tr key={index}>
                    <td> {Galpon.num_galpon}</td>
                    <td> {Galpon.capacidad}</td>
                    <td> {Galpon.disponible? "si" :"no"}</td>
                    <td> {FormatFecha(Galpon.fecha_asignacion)}</td>
                    <td>
                    <button onClick={()=>handleSeleccion(Galpon , "GalponSelector")}>
                        Seleccionar
                    </button>
                    </td>
                    </tr>
                )}
            </tbody>
        </table>
        
        <TablaProduccion
            actividadControl={actividadControl}
            mostrarMortalidad={mostrarMortalidad}
            dataAlimento={dataAlimento}
            dataMed={dataMed}
            dataGasto={dataGasto}
            dataPeso={dataPeso}
            dataLote={dataLote}
            asingEmpleado={asignEmpleado}
            detallesGapon={detallesGalpon}
            handleControlButton={handleControlButton}
            handleSeleccion={handleSeleccion}
            seleccionPorSeccion= {seleccionPorSeccion}
        />
        <table className="produccionProces">
            <thead>
                <tr><th colSpan={9}><h4>Tabla Produccion</h4></th></tr>
            </thead>
            <tbody>
            {Object.keys(seleccionPorSeccion).map((seccion,seccionIndex)=>(
                seleccionPorSeccion[seccion].length > 0 && (
                    <React.Fragment key={seccionIndex}>
                            <tr>
                                <th colSpan={9}>{seccion}</th>
                            </tr>
                        {seleccionPorSeccion[seccion].map((seleccion, seleccionIndex) => (
                            <tr key={`${seleccion.fila.id}-${seccionIndex}-${seleccionIndex}`}>
                                {seccion === "Mortalidad" && (
                                    <>
                                    <td>{seleccion.fila.cantidad}</td>
                                    <td>{seleccion.fila.causa}</td>
                                    <td>{seleccion.fila.descripcion}</td>
                                    </>
                                )}{seccion === "Alimentacion" && (
                                    <>
                                    <td>{seleccion.fila.nombre}</td>
                                    <td>{seleccion.fila.precio}</td>
                                    <td>{seleccion.fila.cantidad}</td>
                                    <td>{seleccion.fila.tipo}</td>
                                    </>
                                )}{seccion === "Medicaciones" && (
                                    <>
                                    <td>{seleccion.fila.nombre}</td>
                                    <td>{seleccion.fila.via}</td>
                                    <td>{seleccion.fila.num_dosis}</td>
                                    <td>{seleccion.fila.cantidad}</td>
                                    </>
                                )}{seccion === "Gastos" && (
                                    <>
                                    <td>{seleccion.fila.detalle}</td>
                                    <td>{seleccion.fila.importe}</td>
                                    </>
                                )}{seccion === "Peso" && (
                                    <>
                                    <td>{seleccion.fila.peso_promedio}</td>
                                    </>
                                )}{seccion === "Lote" && (
                                    <>
                                    <td>{seleccion.fila.raza}</td>
                                    <td>{seleccion.fila.cantidad}</td>
                                    <td>{seleccion.fila.valor_unidad}</td>
                                    </>
                                )}{seccion === "Empleado" && (
                                    <>
                                    <td>{seleccion.fila.nombre}</td>
                                    <td>{seleccion.fila.apellido_paterno}</td>
                                    <td>{seleccion.fila.apellido_materno}</td>
                                    </>
                                )}{seccion === "Galpon" && (
                                    <>
                                    <td>{seleccion.fila.num_galpon}</td>
                                    <td>{seleccion.fila.capacidad}</td>
                                    <td>{seleccion.fila.disponible}</td>
                                    </>
                                )}
                                <td>
                                    <button onClick={()=>handleEliminarSeleccion(seleccion.fila.id, seleccion.seccion)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        
                    </React.Fragment>
                )
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default Produccion