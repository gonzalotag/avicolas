import "../assets/css/produccion.css"
import React,{useState, useEffect} from "react"
import { getAllGalpones } from "../api/galpones.api"
import { getAllMortalidad } from "../api/mortalidad.api"
import { getAllAlimentos } from "../api/alimentos.api"
import { getAllMedicinas } from "../api/medicinas.api"
import { getAllGastos } from "../api/gastos.api"
import { getPerfilesByRol } from "../api/perfil.api"
import { getAllPeso } from "../api/peso.api"
import { postProduccion, patchProduccion } from "../api/produccion.api"
import { getAllLotes } from "../api/lotes.api"
import TablaProduccion from "./TablaProduccion"

function Produccion (){
    const [actividadControl,setActividadControl]=useState('');
    const [mostrarMortalidad, setMostrarMortalidad]=useState(false);
    const [dataAlimento,setDataAlimento]=useState([]);
    const [dataMed,setDataMed]= useState([]);
    const [asignEmpleado,setAsignEmpleado]=useState([]);
    const [dataGasto,setDataGasto] = useState([]);
    const [dataPeso,setDataPeso]=useState([]);
    const [dataLote, setDataLote] = useState([]);
    const [dataGalpon, setDataGalpon] =  useState([]);
    const [isLoading,setIsloading]=useState(false);
    
    const [seleccionPorSeccion, setSeleccionPorSeccion]=useState({
        Alimentacion:[],
        Medicamentos:[],
        Mortalidad:[],
        Gastos:[],
        Peso :[],
        Empleado:[],
        Lote:[],
        Galpon:[],
    })

    useEffect(()=>{
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
                case "Galpon":
                    const galpones = await getAllGalpones();
                    setDataGalpon(galpones);
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

    const handleSeleccion = (fila, seccion) =>{
        const seccionesPermitidas =["Alimentacion", "Medicaciones", "Mortalidad", "Peso", "Gastos", "Empleado", "Lote", "Galpon"] ;
        if(seccionesPermitidas.includes(seccion)){
        const nuevaSeleccion = {fila, seccion};
        setSeleccionPorSeccion(prevState =>{
            const seleccionesPorSeccionActualizadas = {...prevState};
            if (!seleccionesPorSeccionActualizadas.hasOwnProperty(seccion)) {
                seleccionesPorSeccionActualizadas[seccion]=[];
            }
            const existe = seleccionesPorSeccionActualizadas[seccion].some(item =>item.fila&& item.fila.id === fila.id);
            if (!existe) {
                seleccionesPorSeccionActualizadas[seccion].push(nuevaSeleccion);
            }
                return seleccionesPorSeccionActualizadas;
            });
        }
    }

    const handleEliminarSeleccion = (filaId,seccion) =>{
        setSeleccionPorSeccion((prevState) =>{
            const nuevaSeleccionPorSeccion = {...prevState};
            const index= nuevaSeleccionPorSeccion[seccion].findIndex(item => item.fila.id === filaId);
            if (index !== -1) {
                nuevaSeleccionPorSeccion[seccion].splice(index,1);
            }
            return nuevaSeleccionPorSeccion;
        });
    }
    
    

    return (
    <div className="areaProduccion">    
        <TablaProduccion
            actividadControl={actividadControl}
            mostrarMortalidad={mostrarMortalidad}
            dataAlimento={dataAlimento}
            dataMed={dataMed}
            dataGasto={dataGasto}
            dataPeso={dataPeso}
            dataLote={dataLote}
            dataGalpon={dataGalpon}
            asingEmpleado={asignEmpleado}
            handleControlButton={handleControlButton}
            handleSeleccion={handleSeleccion}
            seleccionPorSeccion= {seleccionPorSeccion}
        />
        
        <table className="produccionProces">
            <thead>
                <tr><th colSpan={9}><h4>Tabla de Produccion</h4></th></tr>
            </thead>
            <tbody>
                {Object.keys(seleccionPorSeccion).map((seccion,seccionIndex)=>(
                seleccionPorSeccion[seccion].length > 0 && (
                    <React.Fragment key={seccionIndex}>
                            <tr>
                                <th colSpan={10}>{seccion}</th>
                            </tr>
                        {seleccionPorSeccion[seccion].map((seleccion, seleccionIndex) => (
                            <tr key={`${seleccion.fila.id}-${seleccionIndex}`}>
                                {seleccion.fila &&(<>
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
                                    )}
                                    
                                    {seccion === "Galpon" && (
                                    <>
                                    <td>{seleccion.fila.num_galpon}</td>
                                    <td>{seleccion.fila.capacidad}</td>
                                    <td>{seleccion.fila.disponible? "si":"no"}</td>
                                    </>
                                    )}
                                    
                                </>)}
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