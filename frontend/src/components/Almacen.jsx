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
        window.location.reload();
        await deleteFunction(id); 
        
        }catch(error){
            console.log("Error al eliminar ",error);
            alert("Ocurrio un error al eliminar");
        }
    }

    return (
    <div className="almacenContainer">
        <div className="almacenTabla">
            <Menu/>
            <table className="tableAlmacen">
            <caption><h2>Datos de Lote</h2></caption>
                <thead>
                    <tr>
                        <th>Medicinas</th>
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
                                    Galpon # {galpon.num_galpon }
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
                                        Raza {lote.raza} 
                                    </div>
                                ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table>
            <caption><h2>Medicina</h2></caption>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Via</th>
                    <th>Numero de <br />dosis</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Fecha de <br />compra</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {medicina.map((medicina)=>(
                    <tr key={medicina.id}>
                    <td>{medicina.nombre}</td>
                    <td>{medicina.via}</td>
                    <td>{medicina.num_dosis}</td>
                    <td>{medicina.precio}</td>
                    <td>{medicina.cantidad}</td>
                    <td>{FormatFecha(medicina.fecha_ingreso)}</td>
                    <td><button onClick={()=>deleteItem(medicina.id,'medicina')}>Borrar</button></td>
                    
                </tr>
                ))}
            </tbody>
        </table>
        <table>
            <caption><h2>Galpones de Crianza </h2></caption>
            <thead>
                <tr>
                    <th># Galpon</th>
                    <th>Capacidad</th>
                    <th>Disponible</th>
                    <th>Fecha de <br />Asignacion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {galpones.map((galpon)=>(
                    <tr key={galpon.id}>
                    <td>{galpon.num_galpon}</td>
                    <td>{galpon.capacidad}</td>
                    <td>{galpon.disponible ? "si" :"no"}</td>
                    <td>{FormatFecha(galpon.fecha_asignacion)}</td>
                    <td><button onClick={()=>deleteItem(galpon.id,'galpones')}>Borrar</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        <table>
            <caption><h2>Alimento</h2></caption>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Fecha de compra</th>
                    <th>Cantidad de Sacos</th>
                    <th>Tipo</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {alimentos.map((alimento)=>(
                    <tr key={alimento.id}>
                    <td>{alimento.nombre}</td>
                    <td>{alimento.precio}</td>
                    <td>{alimento.cantidad}</td>
                    <td>{FormatFecha(alimento.fecha_compra)}</td>
                    <td>{alimento.cantidadsacos}</td>
                    <td>{alimento.tipo}</td>
                    <td><button onClick={()=>deleteItem(alimento.id,'alimento')}>Borrar</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        <table>
            <caption><h2>Lote de Gallinas </h2></caption>
            <thead>
                <tr>
                    <th>Raza</th>
                    <th>Fecha de <br />ingreso</th>
                    <th>Cantidad</th>
                    <th>Valor por <br />unidad</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {lotes.map((lote)=>(
                    <tr key={lote.id}>
                    <td>{lote.raza}</td>
                    <td>{FormatFecha(lote.fecha_ingreso)}</td>
                    <td>{lote.cantidad}</td>
                    <td>{lote.valor_unidad}</td>
                    <td><button onClick={()=>deleteItem(lote.id,'lotes')}>Borrar</button>
                    
                    </td>

                </tr>
                ))}
            </tbody>
        </table>
    </div>)
}

export default Almacen;