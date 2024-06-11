import"../assets/css/reportes.css"
import React,{useState,useEffect} from "react";
import { deleteProduccion, getAllProduccion, patchProduccion} from "../api/produccion.api"

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
        })
    }

    return (
        <div className="reportesContainer">
            <h2>Reportes Produccion</h2>
            {isEditing && (
                <div className="editForm">
                    <h3>Editar Produccion</h3>
                    <form onSubmit={handleSave}>
                        <label> Id Alimento: <input type="text" name="alimento" value={editData.id_alimento} onChange={handleChange}/></label>
                        <label> Id Galpon: <input type="text" name="galpon" value={editData.id_galpon} onChange={handleChange}/></label>
                        <label> Id Medicina: <input type="text" name="medicina" value={editData.id_medicina} onChange={handleChange}/></label>
                        {/* <label> Id Perfil: <input type="text" name="perfil" value={editData.id_perfil} onChange={handleChange}/></label> */}
                        <label> Id Lote: <input type="text" name="lote" value={editData.id_lote} onChange={handleChange}/></label>
                        <label> Id Mortalidad: <input type="text" name="mortalidad" value={editData.id_mortalidad} onChange={handleChange}/></label>
                        <label> Id Gastos: <input type="text" name="gastos" value={editData.id_gastos} onChange={handleChange}/></label>
                        <label> Id Peso: <input type="text" name="peso" value={editData.id_peso} onChange={handleChange}/></label>
                        <button type="submit">Guardar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </form>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                    {/* <th>Id</th> */}
                    <th>Alimento</th>
                    <th>Galpon</th>
                    <th>Medicina</th>
                    {/* <th>Perfil</th> */}
                    <th>Lote</th>
                    <th>Mortalidad</th>
                    <th>Gasto</th>
                    <th>Peso</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <RenderSubtablas data={produccionData}/> */}
                    {produccionData.map((item)=>(
                        
                        <tr key={item.id}>
                            <td>{item.id_alimento}</td>
                            <td>{item.id_galpon}</td>
                            <td>{item.id_medicina}</td>
                            <td>{item.id_lote}</td>
                            <td>{item.id_mortalidad}</td>
                            <td>{item.id_gastos}</td>
                            <td>{item.id_peso}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Editar</button>
                                <button onClick={() => handleDelete(item)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                            
                </tbody>
            </table>
        </div>
    )
}
export default Reportes;