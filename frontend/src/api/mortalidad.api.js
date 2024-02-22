import axios from "axios";

async function getAllMortalidad(){
    const response = await axios.get("http://localhost:4000/mortalidad");
    return response.data;
}

async function postMortalidad (mortalidadData){
    try {
        const respuesta=await axios.post(`http://localhost:4000/mortalidad`, mortalidadData); 
        // console.log("Se agrego una nueva mortalidad",respuesta.data);
        return respuesta.data;    
    } catch (error) {
        console.log("error al guardar mortalidad" , error)
    }
    
}
async function patchMortalidad (id, mortalidadData) {
    const respuesta = await axios.put(`http://localhost:4000/mortalidad/${id}`, mortalidadData);
    return respuesta.data;
}

async function deleteMortalidad (id){
    const respuesaEliminar = await axios.delete(`http://localhost:4000/mortalidad/${id}`);
    if(respuesaEliminar.status==200) {
        alert ("Se elimino correctamente")
    } else{
        alert("No se pudo eliminar el alimento")
    }
}

export{
    getAllMortalidad,   
    postMortalidad,
    patchMortalidad,
    deleteMortalidad
}