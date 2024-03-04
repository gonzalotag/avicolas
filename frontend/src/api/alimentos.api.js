import axios from "axios";

async function getAllAlimentos(){
    try {
        const res = await axios.get("http://localhost:4000/alimento");
        // console.log("datos alimentos", res.data);
        return res.data;    
    } catch (error) {
        console.error("error al obtener alimentos" ,  error);
    }
    
}

async function getAlimentosById(id){
    const res = await axios.get(`http://localhost:4000/alimento/${id}`);
    console.log(res.data)
}

async function postAlimentos(formData){
    try {
        console.log("enviando datos al servidor", formData);
        const resp=await axios.post('http://localhost:4000/alimento', formData);    
        // console.log("datos del formulario ", formData);
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
        const resultado=await axios({
            method:'patch',
            url:`http://localhost:4000/alimento/${id}`,
            data:alimentoData
            });
            return resultado.data;
            } catch (error) {
                console.error('Error en la actualización de datos', error );
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