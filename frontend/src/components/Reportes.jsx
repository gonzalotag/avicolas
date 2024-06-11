import"../assets/css/reportes.css"
import React,{useState,useEffect} from "react";
import { deleteProduccion, getAllProduccion, patchProduccion} from "../api/produccion.api"
import ProduccionTabla from "./ProduccionTabla";

function Reportes (){
    const [produccionData,setProduccionData] = useState([]);
    const [isEditing,setIsEditing] = useState(false);
    const [editData,setEditData]= useState({})
    

    useEffect(()=>{
        fetchProduccionData();
    },[]);
    
    const fetchProduccionData = async () =>{
        try {
            const response = await getAllProduccion();
            console.log("produccion data", response);
            setProduccionData(response);
        } catch (error) {
            console.error("Error al obtener los datos de produccion", error);
        }
    }

    const handleEdit = (data)=>{
        setIsEditing(true);
        setEditData(data);
    }

    const handleDelete = async (id)=>{
        try {
            await deleteProduccion(id);
            fetchProduccionData();
        } catch (error) {
            console.error("error al eliminar produccion",error);
        }
    }

    const handleSave = async (e) =>{
        e.preventDefault();
        try {
            await patchProduccion(editData.id, editData);
            setIsEditing(false);
            fetchProduccionData();
        } catch (error) {
            console.error("error al actualizar el registro de produccion", error);
        }
    }

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    }

    return (
        <div className="reportesContainer">
           <h1>Reportes Produccion</h1>
           <ProduccionTabla/>
        </div>
    )
}
export default Reportes;