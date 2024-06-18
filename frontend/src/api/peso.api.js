import axios from 'axios';

async function getAllPeso(){
    try {
        const result = await axios.get("http://localhost:4000/peso")
        return result.data;
    } catch (error) {
        console.error("falla al obtener peso ",error);
    }
}

async function getPesoById(){
    try {
        const result = await axios.get(`http://localhost:4000/peso/${id}`);
        return result.data;
    } catch (error) {
        console.log('Error en la petición de detalle del producto', error);
    }
}

async function postPeso(objPeso){
    try{
        const resultado = await axios.post(`http://localhost:4000/peso`, objPeso);
        if (resultado.status ===200) {
            if (resultado.data !==null) {
                console.log("registro de peso agregado", resultado.data);
            }else{
                console.log ("respuesta en el servidor es null",  resultado.data); 
            }
            return resultado.data;
        }else{
            return null;
        }
    }catch(error){
        console.error("error al enviar solicitud post a peso" ,error);
    }
}

async function patchPeso(id, objPeso){
    try{
        const respuesta =await axios.patch(`http://localhost:4000/peso/${id}`, objPeso);
        return respuesta.data;
    }catch(error){
        console.log('Error en el update');
        throw error;
    }
}

async function deletePeso(id){
    try {
        const existePeso = await axios.get(`http://localhost:4000/peso/${id}`);
        if(!existePeso.data){
            console.error('el peso con ese id no existe');
            return false;
        }
        const respuesta = await axios.delete(`http://localhost:4000/peso/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar el peso", error);
    }
}

export {
    getAllPeso,
    getPesoById,
    postPeso,
    patchPeso,
    deletePeso,
}