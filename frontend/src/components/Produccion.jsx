import "../assets/css/produccion.css"
import React,{useState, useEffect,useReducer} from "react"
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
        Galpon:[]
    })
    const [edicionActiva, setEdicionActiva]=useState(false)
    const [filaEditada,setFilaEditada]=useState(null);
    const [filaSeleccionadaId, setFilaSeleccionadaID] =useState(null);

    useEffect(()=>{
        obtenerDatosEmpleados();
    },[]);

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

    const seccionesPermitidas =["Alimentacion", "Medicaciones", "Mortalidad", "Peso", "Gastos", "Empleado", "Lote", "Galpon"] ;

    const handleSeleccionEnProduccion = (fila, seccion,datos) =>{
        // setSeleccionPorSeccion((prevState)=>{
        //     const newState = {...prevState};
        //     newState[seccion] = datos;
        //     return newState;
        // })

        if (seccionesPermitidas.includes(seccion)) {
            setFilaSeleccionadaID(fila.id);
            setSeleccionPorSeccion((prevState)=>{
                const newState = {...prevState};
                newState[seccion] = newState[seccion]??[];
                const existFila = newState[seccion].some((item) => item.fila.id ===fila.id)
                if (!existFila) {
                    newState[seccion] = [
                        ...newState[seccion],
                        {fila:{...fila},seccion}
                    ];
                }
                return newState;
            });
        }
    }

    const handleEliminarSeleccion = (filaId,seccion) =>{
        setSeleccionPorSeccion((prevState) =>{
            const nuevaSeleccionPorSeccion = {...prevState};
            nuevaSeleccionPorSeccion[seccion] = nuevaSeleccionPorSeccion[
                seccion
            ].filter((item) => item.fila.id  !== filaId);
            return nuevaSeleccionPorSeccion;
            
        });
    }
    
    const handleEditar =(fila)=>{
        setEdicionActiva(true);
        setFilaEditada(fila);
        setSeleccionPorSeccion((prevState)=>{
            const newState = { ...prevState };
            Object.keys(newState).forEach((seccion)=>{
                newState[seccion]= newState[seccion].map((item)=>
                    item.fila.id === fila.id ? {...item,fila} : item
                )
            })
            return newState;
        })
    }

    const handleGuardar =()=>{
        setEdicionActiva(false);
        setFilaEditada(null);
    }

    const handleCancelar =()=>{
        setEdicionActiva(false);
        setFilaEditada(null);
    }
    const renderFilaProduccion =(seleccion,seleccionIndex)=>{
        const {fila,seccion} = seleccion;
        const isEditActive = fila && fila.id === filaSeleccionadaId && edicionActiva;
        return (
            <tr key={`${fila.id}-${seleccionIndex}`}>
                {Object.keys(fila).map((campo,campoIndex)=>
                    isEditActive?(
                    <td key={`${campo}-${campoIndex}`}>
                        <input
                            type="text"
                            value={fila[campo]}
                            onChange={(e)=>handleInputChange(e,campo)}
                        />
                    </td>
                    ):(
                        !["id",
                        "fecha_asignacion",
                        "fecha_update",
                        "fecha_compra",
                        "fecha_medicion",
                        "fecha_muerte",
                        "fecha_ingreso",
                        "fecha_gasto"].includes(campo) && (
                        <td key={`${campo}-${campoIndex}`}>{seleccion.fila[campo]}</td>
                        )
                    )
                )}
                <td>
                    <button onClick={()=>handleEditar(fila)}>Editar</button>
                </td>
                <td>
                    <button onClick={()=>handleEliminarSeleccion(fila.id,seccion)}>Eliminar</button>
                </td>
            </tr>
        )
    }

    const renderSeccionProduccion =(seccion, seccionIndex)=>{
        const selecciones = seleccionPorSeccion[seccion].filter((seleccion)=>seleccion.fila)
        if (selecciones.length === 0) return null;
        return(
            <React.Fragment key={seccionIndex}>
                <tr><th colSpan={10}>{seccion}</th></tr>
                {selecciones.map((seleccion,index)=>
                renderFilaProduccion(seleccion,index)
                )}
            </React.Fragment>
        );
    }

    const handleInputChange =(e,cmapo)=>{
        const valor = e.target.value;
        setFilaEditada((prev)=>({
            ...prev,
            [campo]:valor,
        }));
        setSeleccionPorSeccion((prevState)=>{
            const newState={...prevState}
            newState[seleccion.seccion] = newState[seleccion.seccion].map((item)=>
            item.fila.id === seleccion.fila.id ? {...item, fila:{...item.fila,[campo]:valor } }:item
            )
            return newState;
        })
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
            handleSeleccionEnProduccion={handleSeleccionEnProduccion}
            seleccionPorSeccion= {seleccionPorSeccion}
        />
        
        <table className="produccionProces">
            <thead>
                <tr><th colSpan={9}><h4>Tabla de Produccion</h4></th></tr>
            </thead>
            <tbody>
                {Object.keys(seleccionPorSeccion).map((seccion,seccionIndex)=>
                renderSeccionProduccion(seccion, seccionIndex)
                )}
            </tbody>
        </table>
        {edicionActiva && (
            <div>
                <button onClick={handleGuardar}>Guardar</button>
                <button onClick={handleCancelar}>Cancelar</button>
            </div>
        )}        
        
    </div>
    );
}

export default Produccion