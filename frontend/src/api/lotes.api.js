import axios from "axios";

export const getAllLotes = async() =>{
    try {
        const response = await axios.get('http://localhost:4000/lote');
        return response.data;
    } catch (error) {
        console.log("Error al obtener los lotes");
        throw error;
    }
}

export const getLote = async(id) =>{
    try {
        const respuesta = await axios.get(`http://localhost:4000/lote/${id}`);
        return respuesta.data;
    } catch (error) {
        console.log("Error al obtener el lote");
        throw error;
    }
}
export const postLote = async (data) =>{
    try {
        const response=await axios.post('http://localhost:4000/lote', data);
        return response.data;
    } catch (error) {
        console.log("Error al crear el lote", error.message);
        throw error;
        
    }
}
export const patchLote = async (id, data) =>{
    try {
        console.log("URL , ")
        const respuesta=await axios.put(`${'http://localhost:4000/lote'}/${id}`,data);
        return respuesta.data;
        }catch(error){
            console.log("Error al actualizar el lote: ", error.response.data.message);
        throw error;
        }
};

export const deleteLote = async (id) =>{
    try {
        const result =await axios.delete(`http://localhost:4000/lote/${id}`);
        console.log('resp del server',result);
        return result;
        } catch (error) {
            console.log("Error al borrar el lote: ", error);
            throw error;
        }
};
