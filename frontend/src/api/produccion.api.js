import axios from "axios";

async function getAllProduccion () {    
    try{
        const response = await axios.get("http://localhost:4000/produccion")
        return response.data;
    }catch(error){
        console.error("error al obtener todas las producciones", error);
        throw error;
    }
} 

async function getProduccionItem (id) {          
    try {
        const respuesta = await axios.get(`http://localhost:4000/produccion/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error(`error al obtener la produccion con ID ${id}`,error)
    }
}

async function postProduccion (produccionData){
    try {
        const resp = await axios.post('http://localhost:4000/produccion', produccionData);
        return resp.data;
    } catch (error) {
        console.log("error al crear la produccion",error);
        throw error;
    }
}

async function patchProduccion  (id, prod){
    try {
        const result= await axios.patch(`http://localhost:4000/produccion/${id}`, prod)
        return result.data;
    } catch (error) {
        console.error('error al actualizar la produccion' , error);
        throw error;
    }
}
    
async function deleteProduccion  (id) {            
    let confirmacion = window.confirm("¿Está seguro de eliminar la producción?");
    if (confirmacion) {
        try{
            const respuesta = await axios.delete(`http://localhost:4000/produccion/${id}`);
            console.log("respuesta de eliminacion", respuesta);
            return respuesta.data;
        }catch(error){
            console.error("error al eliminar produccion", error);
            alert("No se ha podido eliminar el registro");
            throw error;
        }
    }
}

export {
    getAllProduccion,
    getProduccionItem,
    postProduccion,
    patchProduccion,
    deleteProduccion,
}