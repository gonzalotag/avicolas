import axios from "axios";

async function getAllProduccion () {    
    try {
        const response = await axios.get('http://localhost:4000/produccion');         
        return response;                
    } catch (error) {
        console.error("error al obtener todas las producciones",error);
        throw error;
    }
    
} 

async function getProduccionItem (id) {          
    const respuesta = await axios.get(`http://localhost:4000/produccion/${id}`);
    return respuesta.data;        
}

async function postProduccion (prod){
    try {                  
        const resp = await axios.post("http://localhost:4000/produccion",prod );                   
    } catch (error) {
        console.log(error);
    }     
}

async function patchProduccion  (id, prod){
    try {
        const result= await axios.patch(`http://localhost:4000/produccion${id}`, prod)
    } catch (error) {
        console.error('error al guardar nueva data' , error)
    }
}
    
async function deleteProduccion  (id) {            
    let confirmacion = window.confirm("¿Está seguro de eliminar la producción?");
    if (confirmacion) {             
        try{                              
            const respuesta = await axios.delete(`http://localhost:4000/prodccion/${id}`);
            
        }catch(error){
            console.log(error);
            alert("No se ha podido eliminar el registro");
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