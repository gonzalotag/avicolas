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
        return resultado.data;
    }catch(error){
        console.log(error);
    }
}

async function patchPeso(id, objPeso){
   try{
       const respuesta =await axios.patch(`http://localhost:4000/peso/${id}`, objPeso);
       return respuesta.data;
   }catch(error){
      console.log('Error en el update');
      console.log(error); 
   }
}

async function deletePeso(){
    try{
        await axios.delete(`http://localhost:4000/peso/${id}`);
        alert('Se ha eliminado correctamente')
    }catch(error){
        console.log('No se ha podido eliminar el registro');
        console.log(error);
    }
}
export {
    getAllPeso,
    getPesoById,
    postPeso,
    patchPeso,
    deletePeso
}