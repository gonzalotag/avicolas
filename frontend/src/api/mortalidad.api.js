import axios from "axios";

async function getAllMortalidad(){
    const response = await axios.get("http://localhost:4000/mortalidad");
    return response.data;
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
    postMortalidad,
    patchMortalidad,
    eliminarMortalidad
    
}