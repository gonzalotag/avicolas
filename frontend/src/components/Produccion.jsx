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

function Produccion (){
    const [selectGalpon,setSelectGalpon]=useState('');
    const [galponProduccion, setGalponProduccion]=useState([]);
    const [actividadControl,setActividadControl]=useState('');
    const [mostrarMortalidad, setMostrarMortalidad]=useState(false);
    const [mortalidadData, setMortalidadData]=useState({cantidad:'',causa:'',descripcion:''});
    const [detallesGalpon,setDetallesGalpon]= useState(null);
    const [dataAlimento,setDataAlimento]=useState([]);
    const [dataMed,setDataMed]= useState([]);
    const [asignEmpleado,setAsignEmpleado]=useState([]);
    const [infoGastos, setInfoGastos]=useState({detalle:'',importe:''});
    const [dataGasto,setDataGasto] = useState([]);
    const [infoPeso,setInfoPeso]=useState({peso:''});
    const [dataPeso,setDataPeso]=useState([]);
    const [dataSelect , setDataSelect]= useState([]);
    const [isLoading,setIsloading]=useState(false);
    const [lineasSeleccionadas,setLineasSeleccionadas]=useState([]);

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
                    await obtenerDatosEmpleados();
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
                default:
                break;
            }
        }catch (error){
            console.error("Error en obtener datos", error);
        }finally{
            setIsloading(false);
        }
    }

    const handleMortalidadChange = (e) =>{
        const {name,value}= e.target;
        if (name==='cantidad' && !/^\d*$/.test(value)) {
            return;
        }
        setMortalidadData((prevData)=>({
            ...prevData,
            [name]: value
        }));  
    };

    const handleGastosChange=(e)=>{
        const {name,value} = e.target;
        if (name==='importe'&& !/^\d*$/.test(value)) {
            return;
        }
        setInfoGastos((prevData)=>({
            ...prevData,
            [name] : value
        }));
    };

    const handlePesoChange =(e)=>{
        const {name,value} = e.target;
        setInfoPeso((prevData)=>({
            ...prevData,
            [name]:(value)
        }));
    }

    const guardarMortalidad = async (e) =>{
        e.preventDefault();
        try {
            const result = await postMortalidad(mortalidadData);
            setMortalidadData({
                cantidad:'',
                causa:"natural",
                descripcion:'',
            });
            console.log(result);
        } catch (error) {
            console.log ('Error al crear mortalidad',error);
        }
    }

    const guardarGastos = async (e) =>{
        e.preventDefault();
        try {
            const result = await postGasto(infoGastos);
            setInfoGastos({
                detalle:'',
                importe:'',
            });
            console.log(result);
        } catch (error) {
            console.error("Error al guardar gastos", error);
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

    const agregarRegistro = async (e)=>{
        e.preventDefault();
        try {
            const result = await postPeso(infoPeso);
            setInfoPeso({
                peso:''
            });
            console.log(result);
        } catch (error) {
            console.error('error al agregar el registro', error);
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
        setLineasSeleccionadas([...lineasSeleccionadas, {fila, seccion}]);
    }
    
    const handleEliminarSeleccion = (index) =>{
        const nuevaLinea =[...lineasSeleccionadas];
        nuevaLinea.splice(index,1);
        setLineasSeleccionadas(nuevaLinea);
    }

    const [columnaSelect,setColumnaSelect] = useState({
        nombre: true,
        tipo: true,
        num_dosis: true,
        cantidad: true,
        disponible: true ,
    });

    const guardarProd =async()=>{
        try {
            const dataGuardada=dataSelect.map(({fila,seccion })=> {
                const datosFiltrados = {};
                Object.keys(columnaSelect).forEach((columna)=>{
                    if (columnaSelect[columna]) {
                        datosFiltrados[columna] = fila[columna];
                    }
                });
                return {fila: datosFiltrados,seccion};
            });

            await postProduction(dataSelect);
            console.log("Datos guardados produccion");
            setDataSelect([]);
        } catch (error) {
            console.log("Error al guardar los datos", error);
        }
    }
    
    const handleSeleccionColumna =(columna) =>{
        setColumnaSelect((prevColumnas) => ({
            ...prevColumnas,
            [columna]: !prevColumnas[columna],
        }));
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
            
            <table className="tablaProduccion">
                <thead>
                    <tr>
                        <th><button className={actividadControl==="Alimentacion" ? "active" :""}
                onClick={()=>handleControlButton("Alimentacion")}>
                    <h4>Alimentacion</h4>
                </button></th>
                        <th><button className={actividadControl==="Medicaciones" ? "active" :""}
                onClick={()=>handleControlButton("Medicaciones")}>
                    <h4>Medicaciones</h4>
                </button></th>
                        <th><button className={actividadControl==="Mortalidad" ? "active" :""}
                onClick={()=>handleControlButton("Mortalidad")}>
                    <h4>Mortalidad</h4>
                </button></th>
                        <th><button className={actividadControl==="Peso" ? "active" :""}
                onClick={()=>handleControlButton("Peso")}>
                    <h4>Peso</h4>
                </button></th>
                        <th><button className={actividadControl==="Gastos" ? "active" :""}
                onClick={()=>handleControlButton("Gastos")}>
                    <h4>Gastos</h4>
                </button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="5">
                            {actividadControl === "Mortalidad" &&(
                            
                            
                            <div>
                                <h3>Mortalidad</h3>
                            
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Causa</th>
                                        <th>Descripcion</th>
                                        <th>Registro de mortalidad</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarMortalidad && mostrarMortalidad.map((decesos,index)=>(
                                        <tr key={index}>
                                            <td> {decesos.cantidad} </td>
                                            <td> {decesos.causa} </td>
                                            <td> {decesos.descripcion} </td>
                                            <td> {FormatFecha(decesos.fecha_muerte)} </td>
                                            <td>
                                            <button onClick={ ()=> handleSeleccion
                                                    (decesos,
                                                    "Mortalidad")}>
                                                    Seleccionar
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            )}
                            {actividadControl ==="Alimentacion" &&(
                                <div>
                                    <h3>Informacion Alimentos</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Tipo</th>
                                                <th>Sacos disponibles</th>
                                                <th>Seleccion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataAlimento && dataAlimento.map((alimento,index)=>(
                                        <tr key={index}>
                                        <td>{alimento.nombre}</td>
                                        <td>{alimento.precio}</td>
                                        <td>{alimento.cantidad}</td>
                                        <td>{alimento.tipo}</td>
                                        <td>{alimento.cantidad_sacos}</td>
                                        <td>
                                        <button onClick={()=>handleSeleccion(alimento , "Alimentacion")}>
                                            Seleccionar
                                        </button>
                                        </td>
                                        </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {actividadControl === "Medicaciones"&&(
                                <div>
                                    <h3>Medicamento</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Via de administracion</th>
                                                <th>Dosis / dia</th>
                                                <th>Precio</th>
                                                <th>Cantidad en almacen</th>
                                                <th>Fecha compra</th>
                                                <th>Seleccion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataMed && dataMed.map((medicinas,index)=>(
                                            <tr key={index}>
                                                <td>{medicinas.nombre}</td>
                                                <td>{medicinas.via}</td>
                                                <td>{medicinas.num_dosis}</td>
                                                <td>{medicinas.precio}</td>
                                                <td>{medicinas.cantidad}</td>
                                                <td>{FormatFecha(medicinas.fecha_ingreso)}</td>
                                                <td>
                                                <button onClick={ ()=> handleSeleccion
                                                    (medicinas,
                                                    "Medicaciones")}>
                                                    Seleccionar
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {actividadControl === "Gastos" && (
                                <div>
                                <h3>Registro de gastos</h3>
                                <table className="tablaGastos">
                                <thead>
                                    <tr>
                                        <th>Gastos</th>
                                        <th>Importe</th>
                                        <th>Fecha de importe</th>
                                        <th>Seleccion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataGasto && Array.isArray(dataGasto) && dataGasto.map((importes,index)=>(
                                        <tr key ={index}>
                                            <td> {importes.detalle} </td>
                                            <td> {importes.importe} </td>
                                            <td> {FormatFecha(importes.fecha_gasto)} </td>  
                                            <td>
                                            <button onClick={ ()=> handleSeleccion
                                                (importes,
                                                "Gastos")}>
                                                Seleccionar
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                </div>
                            )}
                            {actividadControl === "Peso"&&(
                            <div>
                                <h3>Registro peso</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Peso promedio</th>
                                        <th>Fecha de medicion</th>
                                        <th>Seleccion</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                    {dataPeso && dataPeso.map((pesoMedio,index)=>(
                                        <tr key={index}>
                                            <td>{pesoMedio.peso_promedio} </td>
                                            <td>{FormatFecha(pesoMedio.fecha_medicion)} </td>
                                            <td>
                                            <button onClick={()=>handleSeleccion(pesoMedio , "Peso")}>
                                            Seleccionar
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        
            <table className="empleadosTabla">
                <thead>
                    <tr>
                        <th>
                            <button className={actividadControl==="Empleado" ? "active" :""}
                            onClick={()=>handleControlButton("Empleado")}>
                                <h4>Empleados</h4>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {actividadControl==="Empleado"&& 
                        asignEmpleado && 
                        asignEmpleado.map((empleado,index)=>(
                        <tr key={index}>
                            <td>
                                <p>Nombre: {empleado.nombre}</p>
                                <p>Apellido Paterno: {empleado.apellido_paterno}</p>  
                                <p>Apellido Materno: {empleado.apellido_materno}</p>
                                <button onClick={()=>handleSeleccion(empleado , "Empleado")}>
                                    Seleccionar Empleado
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        <table className="produccionProces">
            <thead>
                <tr>
                <th>Alimentos</th>
                <th>Medicamentos</th>
                <th>Mortalidad</th>
                <th>Peso</th>
                <th>Gasto</th>
                <th>Empleado</th>
                <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {lineasSeleccionadas.map((linea,index)=>(
                    <tr key={index}>
                        <td>
                            <div>
                                <strong>Nombre:</strong>{linea.fila.nombre}
                            </div>
                            <div>
                                <strong>Precio:</strong>{linea.fila.precio}
                            </div>
                            <div>
                                <strong>Cantidad:</strong>{linea.fila.cantidad}
                            </div>
                            <div>
                                <strong>Tipo:</strong>{linea.fila.tipo}
                            </div>
                        </td>
                        <td>
                            <div>
                            <strong>Nombre:</strong>{linea.fila.nombre}
                            <br />
                            <strong>Via de Administracion:</strong>{linea.fila.via}
                            </div>
                        </td>
                        <td>
                            <div>
                            <strong>Cantidad:</strong>{linea.fila.cantidad}
                            <br />
                            <strong>Causa:</strong>{linea.fila.causa}
                            </div>
                        </td>
                        <td>
                            <div>
                            <strong>Precio Promedio:</strong>{linea.fila.precio_promedio}
                            </div>
                        </td>
                        <td>
                            <div>
                            <strong>Detalle:</strong>{linea.fila.detalle}
                            <br />
                            <strong>Importe:</strong>{linea.fila.importe}
                            </div>
                        </td>
                        <td>
                            <div>
                            <strong>nombre:</strong>{linea.fila.nombre}
                            </div>
                        </td>
                        <td>
                            <button onClick={()=>handleEliminarSeleccion(index)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
    );
}

export default Produccion