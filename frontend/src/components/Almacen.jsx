import "../assets/css/almacen.css"

import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMedicina, getAllMedicinas } from "../api/medicinas.api";
import { deleteGalpon, getAllGalpones } from "../api/galpones.api";
import { deleteAlimento, getAllAlimentos } from "../api/alimentos.api";
import { deleteLote, getAllLotes } from "../api/lotes.api";
import { eliminarMortalidad,getAllMortalidad } from "../api/mortalidad.api";
import { deletePeso, getAllPeso } from "../api/peso.api";
import { deleteGasto, getAllGastos } from "../api/gastos.api";
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
    const [mortalidades, setMortalidades] = useState([]);
    const [pesos,setPesos] = useState([]);
    const [gastos,setGastos] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);

    useEffect(()=>{
        const fetchData= async ()=>{
            try {
                const medicinasData = await getAllMedicinas();
                setMedicina(medicinasData);

                const galponesData = await getAllGalpones();
                if (Array.isArray(galponesData)) {
                    setGalpones(galponesData);
                }else{
                    console.error("los datos de galpon no es un array");
                }

                const alimentosData = await getAllAlimentos();
                setAlimentos(alimentosData)
            
                const lotesData = await getAllLotes();
                setLotes(lotesData);
            
                const empleadosData = await getPerfilesByRol(4);
                setEmpleado(empleadosData);
                } catch (error) {
                    console.log(error)
                }
                const mortalidadData = await getAllMortalidad();
                setMortalidades(mortalidadData);

                try {
                    const pesosData = await getAllPeso();
                    setPesos(pesosData);    
                } catch (error) {
                    console.error('error al obtener datos', error);
                }
                const gastoData = await getAllGastos();
                setGastos(gastoData);
        }
            fetchData();
    }, []);

    useEffect(()=>{
        const savedPage = localStorage.getItem("currentPage");
        if (savedPage) {
            setCurrentPage(savedPage);
            localStorage.removeItem("currentPage");
        }
    },[]);

    const deleteFunctions = {
        medicina:deleteMedicina,
        alimento:deleteAlimento,
        galpones:deleteGalpon,
        lotes:deleteLote,
        mortalidad:eliminarMortalidad,
        peso:deletePeso,
        gasto:deleteGasto,
    }

    const deleteItem = async (id, tipoEntidad) => {
        try{
            
            console.log("deleteItem", id, tipoEntidad);
            const deleteFunction= deleteFunctions[tipoEntidad];
            localStorage.setItem("currentPage", window.location.pathname);
            console.log(window.location.pathname);
            await deleteFunction(id);
            alert ("se elimino con exito");
            window.location.reload();
        }catch(error){
            console.log("error al eliminar",error);
        }
    }

    return (
    <div className="almacenContainer">
        <div className="almacenTabla">
            <Menu/>
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
                    <td>{medicina.num_dosis} /dia</td>
                    <td>{medicina.precio}</td>
                    <td>{medicina.cantidad} und. </td>
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
                {Array.isArray(galpones) && galpones.map((galpon)=>(
                <tr key={galpon.id}>
                    <td># {galpon.num_galpon} </td>
                    <td>{galpon.capacidad} und.</td>
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
                    <th>Cantidad de Alimento en Almacen</th>
                    <th>Tipo</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {alimentos.map((alimento)=>(
                    <tr key={alimento.id}>
                    <td>{alimento.nombre}</td>
                    <td>{alimento.precio} $ </td>
                    <td>{alimento.cantidad} und. </td>
                    <td>{FormatFecha(alimento.fecha_compra)}</td>
                    <td>{alimento.cantidad_sacos} und. </td>
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
                {lotes && lotes.map((lote)=>(
                    <tr key={lote.id}>
                    <td>{lote.raza}</td>
                    <td>{FormatFecha(lote.fecha_ingreso)}</td>
                    <td>{lote.cantidad} und.</td>
                    <td>{lote.valor_unidad} $ </td>
                    <td><button onClick={()=>deleteItem(lote.id,'lotes')}>Borrar</button>
                    </td>

                </tr>
                ))}
            </tbody>
        </table>
        <table className="">
            <caption><h2>Mortalidad</h2></caption>
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Causa</th>
                    <th>Descripcion</th>
                    <th>Fecha de Registro</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {mortalidades.map((mortalidad)=>(
                <tr key={mortalidad.id}>
                    <td>{mortalidad.cantidad} und.</td>
                    <td>{mortalidad.causa}</td>
                    <td>{mortalidad.descripcion}</td>
                    <td>{FormatFecha(mortalidad.fecha_muerte)}</td>
                    <td><button onClick={()=>deleteItem(mortalidad.id,'mortalidad')}>Borrar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        <table className="">
            <caption><h2>Peso</h2></caption>
            <thead>
                <tr>
                    <th>Peso Promedio</th>
                    <th>Fecha Medicion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {pesos.map((peso)=>(
                <tr key={peso.id}>
                    <td>{peso.peso_promedio} kgs.</td>
                    <td>{FormatFecha(peso.fecha_medicion)}</td>
                    <td><button onClick={()=>deleteItem(peso.id,'peso')}>Borrar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        <table className="">
            <caption><h2>Gastos</h2></caption>
            <thead>
                <tr>
                    <th>Detalle</th>
                    <th>Fecha compra</th>
                    <th>Importe</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {gastos.map((gasto)=>(
                    <tr key={gasto.id}>
                        <td>{gasto.detalle}</td>
                        <td>{FormatFecha(gasto.fecha_gasto)}</td>
                        <td>{gasto.importe} $</td>
                        <td><button onClick={()=>deleteItem(gasto.id,'gasto')}>Borrar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}

export default Almacen;