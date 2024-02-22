import "../assets/css/almacen.css"
import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { deleteMedicina, getAllMedicinas } from "../api/medicinas.api";
import { deleteGalpon, getAllGalpones } from "../api/galpones.api";
import { deleteAlimento, getAllAlimentos } from "../api/alimentos.api";
import { deleteLote, getAllLotes } from "../api/lotes.api";
import { getPerfilesByRol } from "../api/perfil.api";
import Menu from "./Menu";
import { FormatFecha } from "./FormatFecha";

function Almacen (){

    const navigate = useNavigate();
    const [medicina,setMedicina] = useState([]);
    const [galpones, setGalpones]= useState([]);
    const [alimentos,setAlimentos]= useState([]);
    const [lotes,setLotes] = useState([]);
    const [empleado,setEmpleado] = useState([]);

    

    useEffect(()=>{
        const fetchData= async ()=>{
        
            try {
                const medicinasData = await getAllMedicinas();
                setMedicina(medicinasData);

                const galponesData = await getAllGalpones();
                if (Array.isArray(galponesData.data)) {
                    setGalpones(galponesData.data);    
                }else{
                    console.error("los datos de galpones no es un array ");
                }

                const alimentosData = await getAllAlimentos();
                
                setAlimentos(alimentosData)
            
                const lotesData = await getAllLotes();
                
                setLotes(lotesData.data)
            
                const empleadosData = await getPerfilesByRol(4);
                setEmpleado(empleadosData);
                } catch (error) {
                    console.log(error)
                }
            }
                fetchData();
    }, []);
    const deleteFunctions = {
        medicina:deleteMedicina,
        alimento:deleteAlimento,
        galpones:deleteGalpon,
        lotes:deleteLote,
    }
    const deleteItem = async (id,tipoEntidad) =>{
        try{   
            console.log('deleteitem',id,tipoEntidad);
        const deleteFunction =deleteFunctions[tipoEntidad];
        if(!deleteFunction){
            console.error('tipo de entidad no valido');
            return;
        }   
        await deleteFunction(id); 
        alert("Se elimino con exito");
        }catch(error){
            console.log("Error al eliminar ",error);
            alert("Ocurrio un error al eliminar");
        }
    }

    return (
    <div className="almacenContainer">
        <div className="almacenTabla">
            <Menu/>
            <h2>datos de lote</h2>
            <table className="tableAlmacen">
                <thead>
                    <tr>
                        <th>medicinas</th>
                        <th>Galpones</th>
                        <th>Alimentos</th>
                        <th>Empleados</th>
                        <th>Lote</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {medicina.map((medicina)=>(
                                <div key={medicina.id}>
                                    {medicina.nombre}
                                </div>
                            ))}
                        </td>
                        <td>
                            {galpones.map((galpon)=>(
                                <div key={galpon.id}>
                                    galpon # {galpon.num_galpon }
                                </div>
                            ))}
                        </td>
                        <td>
                            {alimentos.map((alimento)=>(
                                <div key={alimento.id}>
                                    {alimento.nombre} 
                                </div>
                            ))}
                        </td>
                        <td>{empleado.map((perfil)=>(
                            <div key={perfil.id}>
                                {perfil.nombre} {perfil.apellido_paterno}
                            </div>
                        ))}</td>
                        <td>
                            {lotes.map((lote)=>(
                                    <div key={lote.id}>
                                        raza {lote.raza} 
                                    </div>
                                ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table>
            <caption><h2>medicina</h2></caption>
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>tipo</th>
                    <th>numero de dosis</th>
                    <th>precio</th>
                    <th>cantidad</th>
                    <th>fecha de compra</th>
                    <th>accion</th>
                </tr>
            </thead>
            <tbody>
                {medicina.map((medicina)=>(
                    <tr key={medicina.id}>
                    <td>{medicina.nombre}</td>
                    <td>{medicina.tipo}</td>
                    <td>{medicina.num_dosis}</td>
                    <td>{medicina.precio}</td>
                    <td>{medicina.cantidad}</td>
                    <td>{FormatFecha(medicina.fecha_ingreso)}</td>
                    <td><button onClick={()=>deleteItem(medicina.id,'medicina')}>borrar</button></td>
                    
                </tr>
                ))}
            </tbody>
        </table>
        <table>
            <caption><h2>galpones de crianza </h2></caption>
            <thead>
                <tr>
                    <th># galpon</th>
                    <th>capacidad</th>
                    <th>disponible</th>
                    <th>fecha de asignacion</th>
                    <th>accion</th>
                </tr>
            </thead>
            <tbody>
                {galpones.map((galpon)=>(
                    <tr key={galpon.id}>
                    <td>{galpon.num_galpon}</td>
                    <td>{galpon.capacidad}</td>
                    <td>{galpon.disponible}</td>
                    <td>{FormatFecha(galpon.fecha_asignacion)}</td>
                    <td><button onClick={()=>deleteItem(galpon.id,'galpones')}>borrar</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        <table>
            <caption><h2>alimento</h2></caption>
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>precio</th>
                    <th>cantidad</th>
                    <th>fecha de compra</th>
                    <th>accion</th>
                </tr>
            </thead>
            <tbody>
                {alimentos.map((alimento)=>(
                    <tr key={alimento.id}>
                    <td>{alimento.nombre}</td>
                    <td>{alimento.precio}</td>
                    <td>{alimento.cantidad}</td>
                    <td>{FormatFecha(alimento.fecha_compra)}</td>
                    <td><button onClick={()=>deleteItem(alimento.id,'alimento')}>borrar</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        <table>
            <caption><h2>lote de gallinas </h2></caption>
            <thead>
                <tr>
                    <th>raza</th>
                    <th>fecha de ingreso</th>
                    <th>cantidad</th>
                    <th>valor por unidad</th>
                    <th>accion</th>
                </tr>
            </thead>
            <tbody>
                {lotes.map((lote)=>(
                    <tr key={lote.id}>
                    <td>{lote.raza}</td>
                    <td>{FormatFecha(lote.fecha_ingreso)}</td>
                    <td>{lote.cantidad}</td>
                    <td>{lote.valor_unidad}</td>
                    <td><button onClick={()=>deleteItem(lote.id,'lotes')}>borrar</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>)
}

export default Almacen;