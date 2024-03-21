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

async function deletePeso(id){
    try {
        // const pesoExiste = await axios.get(`http://localhost:4000/peso/${id}`);
        // if (pesoExiste.status != 200) {
        //     console.error('el peso con el ID' + id + 'no existe');
        //     return;
        // }
           const respuesta = await axios.delete(`http://localhost:4000/peso/${id}`);
           console.log(respuesta);
           window.location.reload();
           return true;
    } catch (error) {
        console.error("error al borrar peso",error);
    }
}
export {
    getAllPeso,
    getPesoById,
    postPeso,
    patchPeso,
    deletePeso
}