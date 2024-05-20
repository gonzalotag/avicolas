import axios from "axios";

async function getAllMortalidad(){
    try {
        const response = await axios.get("http://localhost:4000/mortalidad");
        return response.data;
    } catch (error) {
        console.error("error al obtener registro", error);
    }
}

async function getMortalidad(id){
    try {
        const result = await axios.get(`http://localhost:4000/mortalidad/${id}`)
        return result.data;
    } catch (error) {
        console.error("error al obtener registro", error);
    }
}
async function postMortalidad (mortalidadData){
    try {
        const respuesta=await axios.post('http://localhost:4000/mortalidad',mortalidadData);
        if (respuesta.status === 201) {
            if (respuesta.data !== null) {
                console.log("informacion de mortalidad agregado",respuesta.data );
            }
            return respuesta.data;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function patchMortalidad (id, mortalidadData) {
    try {
        const respuesta = await axios.put(`http://localhost:4000/mortalidad/${id}`, mortalidadData);
        return respuesta.data;
    } catch (error){
        console.log(error);
        return false;
    }
}

async function  eliminarMortalidad(id){
    try {
        const respuestaEliminar= await axios.delete(`http://localhost:4000/mortalidad/${id}`);
        return respuestaEliminar.data;
    } catch (error) {
        throw error;
   }
}

export{
    getAllMortalidad,
    getMortalidad,
    postMortalidad,
    patchMortalidad,
    eliminarMortalidad,
}