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

    const handleCancelar = () =>{
        setIsEditing(false);
        setEditData({});
    }

    const handleChange =(e)=>{
        const {name, value} = e.target;
        const keys = name.split(".");
        if(keys.length === 2 ){
            setEditData({
            ...editData,
            [keys[0]]:{
                ...editData[keys[0]],
                [keys[1]]:value,
            },
        });
        }else{
            setEditData({
                ...editData,
                [name]:value,
            })

        }
    }

    return (
        <div className="reportesContainer">
           <h1>Reportes Produccion</h1>
           <ProduccionTabla
                producciones={produccionData}
                onEdit={handleEdit}
                onDelete={handleDelete}
           />
        {isEditing &&(
            <form onSubmit={handleSave}>
                <div>
                    <h3>Alimento</h3>
                    <label>
                        Nombre Alimento:
                        <input type="text"
                        name="alimento.nombre"
                        value={editData.alimento?.nombre || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Precio:
                        <input type="number" 
                        name="alimento.precio"
                        value={editData.alimento?.precio|| ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cantidad:
                        <input type="number" 
                        name="alimento.cantidad"
                        value={editData.alimento?.precio|| ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cantidad Sacos:
                        <input type="number" 
                        name="alimento.cantidad_sacos"
                        value={editData.alimento?.cantidad_sacos|| ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Tipo:
                        <input type="text" 
                        name="alimento.tipo"
                        value={editData.alimento?.tipo|| ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Precio:
                        <input type="number" 
                        name="alimento.precio"
                        value={editData.alimento?.precio|| ""}
                        onChange={handleChange}
                        />
                    </label>
                    <h3>Galpon</h3>
                    <label>
                        Numero Galpon:
                        <input type="number" 
                        name="galpon.num_galpon"
                        value={editData.galpon?.num_galpon|| ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        Capacidad:
                        <input type="number"
                            name="galpon.capacidad"
                            value={editData.galpon?.capacidad ||""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Disponible:
                        <select name="galpon.disponible" 
                            value={editData.galpon?.disponible ||""}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <h3>Medicinas</h3>
                    <label>
                        Nombre Medicina:
                        <input type="text"
                        name="medicina.nombre"
                        value={editData.medicina?.nombre || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Via:
                        <input type="text"
                        name="medicina.via"
                        value={editData.medicina?.via || ""}
                        onChange={handleChange}
                         />
                    </label><label>
                        #de Dosis:
                        <input type="Number"
                        name="medicina.num_dosis"
                        value={editData.medicina?.num_dosis || ""}
                        onChange={handleChange}
                         />
                    </label><label>
                        Precio:
                        <input type="numbre"
                        name="medicina.precio"
                        value={editData.medicina?.precio || ""}
                        onChange={handleChange}
                         />
                    </label><label>
                        Cantidad:
                        <input type="number"
                        name="medicina.cantidad"
                        value={editData.medicina?.cantidad || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <h3>Perfil</h3>
                    <label>
                        Nombre:
                        <input type="text"
                        name="perfil.nombre"
                        value={editData.perfil?.nombre || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Ap. Paterno:
                        <input type="text"
                        name="perfil.apellido_paterno"
                        value={editData.perfil?.apellido_paterno || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Ap. Materno:
                        <input type="text"
                        name="perfil.apellido_materno"
                        value={editData.perfil?.apellido_materno || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <h3>Lote</h3>
                    <label>
                        Raza:
                        <input type="text"
                        name="lote.raza"
                        value={editData.lote?.raza || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Cantidad:
                        <input type="number"
                        name="lote.cantidad"
                        value={editData.lote?.cantidad || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Valor Unidad:
                        <input type="number"
                        name="lote.valor_unidad"
                        value={editData.lote?.valor_unidad || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <h3>Mortalidad</h3>
                    <label>
                        Cantidad:
                        <input type="number"
                        name="mortalidad.cantidad"
                        value={editData.mortalidad?.cantidad || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Causa:
                        <input type="text"
                        name="mortalidad.causa"
                        value={editData.mortalidad?.causa || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Descripcion:
                        <textarea name="mortalidad.descripcion"
                        value={editData.mortalidad?.descripcion || ""}
                        onChange={handleChange}
                        >
                        </textarea>
                    </label>
                    <h3>Gastos</h3>
                    <label>
                        Detalle:
                        <input type="text"
                        name="gasto.detalle"
                        value={editData.gasto?.detalle || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <label>
                        Importe:
                        <input type="number"
                        name="gasto.importe"
                        value={editData.gasto?.importe || ""}
                        onChange={handleChange}
                         />
                    </label>
                    <h3>Peso</h3>
                    <label>
                        Peso Promedio:
                        <input type="number"
                        name="peso.peso_promedio"
                        value={editData.peso?.peso_promedio || ""}
                        onChange={handleChange}
                         />
                    </label>
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
            </form>
        )}
        </div>
        
    )
}
export default Reportes;