import "../assets/css/almacen.css"
import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllMedicinas } from "../api/medicinas.api";
import { getAllGalpones } from "../api/galpones.api";
import { getAllAlimentos } from "../api/alimentos.api";
import { getAllLotes } from "../api/lotes.api";
import { getPerfiles } from "../api/perfil.api";


function Almacen (){

    const navigate = useNavigate();
    const [medicina,setmedicina] = useState([]);
    const [galpones, setGalpones]= useState([]);
    const [alimentos,setAlimentos]= useState([]);
    const [lotes,setLotes] = useState([]);
    useEffect(()=>{
        const fetchMedicina = async () =>{
            try {
                const medicinasData = await getAllMedicinas();
                setmedicina(medicinasData);
            } catch (error) {
                console.log("error de obtencion de medicinas",error)
            }
        };
        const fetchGalpones = async () =>{
            try {
                const galponesData = await getAllGalpones();
                console.log("datos de galpones",galponesData)
                if (Array.isArray(galponesData.data)) {
                    setGalpones(galponesData.data);    
                }else{
                    console.error("los datos de galpones no es un array ");
                }
            } catch (error) {
                console.error("error de obtencion de galpones",error);
            }
        }
        const fetchAlimentos = async () =>{
            try {
                const alimentosData = await getAllAlimentos();
                console.log("datos de alimentos",alimentosData)
                setAlimentos(alimentosData)
            } catch (error) {
                console.error("error de obtencion de alimentos",error);
            }
        }
        const fetchLote = async () =>{
            try {
                const lotesData = await getAllLotes();
                console.log('todo lotes de gallinas ',lotesData)
                setLotes(lotesData.data)
            } catch (error) {
                console.error("error de obtencion de lotes",error);
            }
        }
        fetchMedicina();
        fetchGalpones();
        fetchAlimentos();
        fetchLote();
    },[])
    return (
    <div className="almacenContainer">
        <div><h2>datos de lote</h2></div>
        <div className="almacenTabla">
            <table className="tableAlmacen">
                <thead>
                    <tr>
                        <th>nombre de medicinas</th>
                        <th>Galpones</th>
                        <th>Alimentos</th>
                        <th>Lote</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                {medicina.map((medicina)=>(
                                    <li key={medicina.id}>
                                        {medicina.nombre}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {galpones.map((galpon)=>(
                                    <li key={galpon.id}>
                                        {galpon.num_gallina } gallinas
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {alimentos.map((alimento)=>(
                                    <li key={alimento.id}>
                                        {alimento.nombre}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                            {lotes.map((lote)=>(
                                    <li key={lote.id}>
                                        {lote.raza}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div><h2>medicinas</h2>
        <button onClick={()=> navigate('/medicinas')}>
            <h2>registrar ingreso de medicinas</h2></button>
            
        </div>    
        <div><h2>galpon</h2>
        <button onClick={()=> navigate('/galpon')}>
            <h2>asignar galpones</h2></button>
            
        </div>
        <div><h2>alimentos</h2>
        <button onClick={()=> navigate('/alimentos')}>
            <h2>registrar alimentos</h2></button>
        
        </div>
        <div><h2>lotes</h2>
        <button onClick={()=> navigate('/lote')}>
            <h2>registrar lotes</h2></button>
        
        </div>
    </div>)
}

export default Almacen;