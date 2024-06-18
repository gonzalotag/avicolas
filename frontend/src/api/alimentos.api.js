import axios from "axios";

async function getAllAlimentos(){
    try {
        const res = await axios.get("http://localhost:4000/alimento");
        return res.data;    
    } catch (error) {
        console.error("error al obtener alimentos" ,  error);
    }
}

async function getAlimentosById(ids){
    try {
        const res = await Promise.all(ids.map(id =>axios.get(`http://localhost:4000/alimento/${id}`)));
        return res.data;
    } catch (error) {
        console.error(`error al obtener alimento con el id:${id}`, error);
    }
}

async function postAlimentos(formData){
    try {
        const resp=await axios.post('http://localhost:4000/alimento', formData);    
        return resp.data;    
    } catch (error) {
        console.error("error la enviar datos al servidor ",error)
        if (error.response) {
            console.error("resp del servidor", error.response.data)
        }
    }
}

async function patchAlimento(id,alimentoData){
    try {
        const resultado = await axios.patch(`http://localhost:4000/alimento/${id}`,alimentoData);
            return resultado.data;
            } catch (error) {
                if (error.response) {
                    console.error('Error en la actualizacion de datos', error.response.data);
                } else {
                    console.error('Error en la actualización de datos', error.message );    
                }
                throw error;
            }
}

async function deleteAlimento(id){
    try{
        const res = await axios.delete(`http://localhost:4000/alimento/${id}`);
        alert ('Se ha eliminado correctamente');
        return res;
        }catch(error){
            console.error(error);
            throw error;
        }
}


export{
    getAllAlimentos,
    getAlimentosById,
    deleteAlimento,
    postAlimentos,
    patchAlimento,
}