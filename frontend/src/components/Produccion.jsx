import "../assets/css/produccion.css"
import React,{useState, useEffect} from "react"
import { getAllGalpones,getGalpon } from "../api/galpones.api"
import { postMortalidad } from "../api/mortalidad.api"
import { getAllAlimentos } from "../api/alimentos.api"
import { getAllMedicinas } from "../api/medicinas.api"
import { postGasto } from "../api/gastos.api"
import { FormatFecha } from "./FormatFecha"
import { getPerfiles, getPerfilesByRol } from "../api/perfil.api"
import { getAllPeso, postPeso } from "../api/peso.api"
import { getAllRoles } from "../api/rol.api"
import { getLote } from "../api/lotes.api"


function Produccion (){
    const [selectGalpon,setSelectGalpon]=useState('');
    const [galponProduccion, setGalponProduccion]=useState([]);
    const [actividadControl,setActividadControl]=useState('');
    const [mostrarMortalidad, setMostrarMortalidad]=useState(false);
    const [mortalidadData, setMortalidadData]=useState({
        cantidad:'',
        causa:'',
        descripcion:'',
    });
    const [detallesGalpon,setDetallesGalpon]= useState(null);
    const [dataAlimento,setDataAlimento]=useState([]);
    const [dataMed,setDataMed]= useState([]);
    const [asignEmpleado,setAsignEmpleado]=useState([]);
    const [infoGastos, setInfoGastos]=useState({
        detalle:'',
        importe:'',
    });
    const [infoPeso,setInfoPeso]=useState({
        peso:'',
    });
    const [dataSelect , setDataSelect]= useState([]);


    useEffect(()=>{
        obtenerGalpon();
        obtenerEmpleadoRol();
    },[]);

    const handleControlButton = async (control)=>{
        setActividadControl(control);
        if (control === "Mortalidad") {
            setMostrarMortalidad(true);
        } else {
            setMostrarMortalidad(false);
        }

        if(control === "Alimentacion"){
            try {
                const infoAlimento= await getAllAlimentos();
                setDataAlimento(infoAlimento);
            } catch (error) {
                console.error("no data alimentos", error);
            }
        }else{

        }
        if (control === "Medicaciones") {
            try {
                const medicas = await getAllMedicinas();
                setDataMed(medicas);
            } catch (error) {
                console.error("no data medicinas", error);
            }
        } else {
            setDataMed(null);
        }
        if (control === "Empleado") {
            await obtenerEmpleadoRol();
        } else {
            setAsignEmpleado(null);
        }
        if (control === "Peso") {
            try {
                const  peso = await getAllPeso() 
                setInfoPeso(peso);
            } catch (error) {
                console.error('no hay data de peso',error )
            }
        } else {
            
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
            console.log ('error al crear mortalidad',error);
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
            
        }
    }

    async function obtenerGalpon(){
        const result = await getAllGalpones();
        setGalponProduccion(result.data||[]);
    }

    const handleMapGalpon = async (e) => {
        const selectGalponId = e.target.value;
        setSelectGalpon(selectGalponId)
        try{
            const galponDetalle = await getGalpon(selectGalponId);
            setDetallesGalpon(galponDetalle.data);
        }catch{
            console.error("error al obtener detalles de galpon", error);
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
    
    const obtenerEmpleadoRol = async () => {
        try {
            const idRolEmp = 4;
            const empleados = await getPerfilesByRol(idRolEmp);
            setAsignEmpleado(empleados);
        } catch (error) {
            console.log('error al obtener empleados por rol', error);
        }
    };

    const handleSeleccion = (elemento) =>{
        setDataSelect((prevData)=>[...prevData, elemento]);
    }
    
    const handleSelectTabla = (elemento) =>{
        setDataSelect((prevData)=>[...prevData, elemento]);
    }

    const handleEliminarSeleccion = (index) =>{
        const nuevaData =[...dataSelect];
        nuevaData.splice(index,1);
        setDataSelect(nuevaData);
    }

    return (
    <div className="areaProduccion">
        <div className="galponSelector">
            <label ><h2>seleccionar galpon</h2></label>
                <select
                value={selectGalpon}
                onChange={handleMapGalpon}
                >
                <option value="">seleccionar galpon</option>
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
                        <th colSpan="4">
                        <h3>detalle de galpon seleccionado</h3>
                        </th>
                    </tr>
            </thead>
            <tbody>
                
                {detallesGalpon && detallesGalpon.map((Galpon,index) => 
                <tr key={index}>
                    <td>numero: {Galpon.num_galpon}</td>
                    <td>capacidad: {Galpon.capacidad}</td>
                    <td>disponibilidad: {Galpon.disponible? "si" :"no"}</td>
                    <td>fecha: {FormatFecha(Galpon.fecha_asignacion)}</td>
                    </tr>
                )}
            </tbody>
        </table>
            
            <table className="tablaProduccion">
                <thead>
                    <tr>
                        <th>
                        <button className={actividadControl==="Alimentacion" ? "active" :""}
                onClick={()=>handleControlButton("Alimentacion")}>
                    Alimentacion
                </button>
                        </th>
                        <th><button className={actividadControl==="Medicaciones" ? "active" :""}
                onClick={()=>handleControlButton("Medicaciones")}>
                    Medicaciones
                </button></th>
                        <th><button className={actividadControl==="Mortalidad" ? "active" :""}
                onClick={()=>handleControlButton("Mortalidad")}>
                    Mortalidad
                </button></th>
                        <th><button className={actividadControl==="Peso" ? "active" :""}
                onClick={()=>handleControlButton("Peso")}>
                    Peso
                </button></th>
                        <th><button className={actividadControl==="Gastos" ? "active" :""}
                onClick={()=>handleControlButton("Gastos")}>
                    Gastos
                </button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="5">
                            {actividadControl === "Mortalidad" &&(
                            <form className="formularioMortalidad">
                            <label>cantidad</label>
                            <input 
                            type="text"
                            value={mortalidadData.cantidad}
                            onChange={(e)=>handleMortalidadChange(e)}
                            name="cantidad"
                            required
                            />
                            <br />
                            <label>causa</label>
                            <select name="causa"
                            value={mortalidadData.causa}
                            onChange={(e) => handleMortalidadChange(e)} 
                            required
                            >   
                                <option value=""></option>
                                <option value="natural">natural</option>
                                <option value="enfermedad">enfermedad</option>
                                <option value="accidente">accidente</option>
                                <option value="accidente">parasitos</option>
                                <option value="accidente">mala alimentacion</option>
                                <option value="accidente">ataques de depredadores</option>
                            </select>
                            <br />
                            <label>descripcion</label>
                            <textarea 
                            name="descripcion"
                            value={mortalidadData.descripcion}
                            onChange={(e) => handleMortalidadChange(e)}
                            style={{ width: '200px', height:'30px'}}
                            required
                            ></textarea>
                            <br />
                            <button  
                            type="button"
                            onClick ={(e)=>guardarMortalidad(e)}
                            >guardar </button>  
                            <div>
                                <h3>mortalidad</h3>
                                
                            </div>
                            </form>
                            )}
                            {actividadControl ==="Alimentacion" &&(
                                <div>
                                    <h3>informacion Alimentos</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>nombre</th>
                                                <th>precio</th>
                                                <th>cantidad</th>
                                                <th>tipo</th>
                                                <th>sacos disponibles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataAlimento && dataAlimento.map((alimento,index)=>(
                                        <tr key={index}>
                                        <td>{alimento.nombre}</td>
                                        <td>{alimento.precio}</td>
                                        <td>{alimento.cantidad}</td>
                                        <td>{alimento.tipo}</td>
                                        <td>{alimento.cantidadsacos}</td>
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
                                                <th>nombre</th>
                                                <th>tipo</th>
                                                <th>dosis / dia</th>
                                                <th>precio</th>
                                                <th>cantidad en almacen</th>
                                                <th>fecha compra</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataMed && dataMed.map((medicinas,index)=>(
                                            <tr key={index}>
                                                <td>{medicinas.nombre}</td>
                                                <td>{medicinas.tipo}</td>
                                                <td>{medicinas.num_dosis}</td>
                                                <td>{medicinas.precio}</td>
                                                <td>{medicinas.cantidad}</td>
                                                <td>{FormatFecha(medicinas.fecha_ingreso)}</td>
                                                <td>
                                                <button onClick={()=>handleSeleccion({tipo: 'A', nombre: 'elemento A' })}>seleccionar elemento a</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {actividadControl === "Gastos" && (
                                <form className="gastosForm">
                                    <label htmlFor="">detalles:</label>
                                    <textarea
                                    name="detalle"
                                    type="text"
                                    value={infoGastos.detalle}
                                    onChange={(e)=>handleGastosChange(e)}
                                    style={{ width: '200px', height:'30px'}}
                                    required>
                                    </textarea> 
                                    <br />
                                    <label htmlFor="">importe:</label>
                                    <input 
                                    type="text" 
                                    value={infoGastos.importe}
                                    onChange={(e)=>handleGastosChange(e)}
                                    name="importe"
                                    required
                                    />
                                    <br />
                                    <button
                                    type="button"
                                    onClick={(e) => guardarGastos(e)}
                                    >
                                        guardar
                                    </button>
                                </form>
                            )}
                            {actividadControl === "Peso"&&(
                                <form className="pesoForm">
                                    <label htmlFor="">Peso:</label>
                                    <input  
                                    type='text'
                                    name='peso'
                                    value={infoPeso.peso === undefined ? '' : infoPeso.peso}
                                    onChange={(e)=>handlePesoChange(e)}
                                    required/> 
                                    <br />
                                    <button 
                                    type='submit' 
                                    onClick={(e)=>agregarRegistro(e)}>Agregar Registro</button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <table className="empleadosTabla">
                <thead>
                    <tr>
                        <th>
                            
                            <button className=
                            {actividadControl==="Empleado" ? "active" :""}
                            onClick={()=>handleControlButton("Empleado")}>
                                Empleados
                            </button>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {actividadControl==="Empleado"&& asignEmpleado && asignEmpleado.map((empleado,index)=>(
                        <tr key={index}>
                            <td>
                                    <p>nombre: {empleado.nombre}</p>
                                    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        <table className="produccionProses">
            <thead>
                <tr>
                    <th>elemento seleccionado </th>
                    <th>acciones </th>
                </tr>
            </thead>
            <tbody>
                {dataSelect.map((elemento,index)=>(
                    <tr key={index}>
                        <td>
                            <button onClick={()=>handleEliminarSeleccion(index)}>eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <h3>seleccion elementos</h3>
            <button onClick={()=>handleSeleccion({tipo: 'A', nombre: 'elemento A' })}>seleccionar elemento a</button>
            <button onClick={()=>handleSeleccion({tipo: 'b', nombre: 'elemento b' })}>seleccionar elemento b</button>
        </div>
    </div>
    );
}

export default Produccion