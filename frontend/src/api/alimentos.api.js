import axios from "axios";

async function getAlimentos(){
    const res = await axios.get("http://localhost:4000/alimento");
    return res.data;
}

async function getAlimentosById(id){
    const res = await axios.get(`http://localhost:4000/alimento/${id}`);
    console.log(res.data)
}
async function deleteAlimento(id){
    try{
        await axios.delete(`http://localhost:4000/alimento/${id}`);
        alert ('Se ha eliminado correctamente')
        }catch(error){
            console.error(error);
            throw error;
            }
}
async function postAlimentos(id,data){
    try {
        const result = await axios.post(`http://localhost:4000/alimento/${id}`, data);
        return result.data;
    } catch (error) {
        console.error('error al guardar alimento', error )
        throw error;
    }
}

async function patchAlimento(id,alimentoData){
    //console.log(alimentoData);
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
export{
    getAlimentos,
    getAlimentosById,
    deleteAlimento,
    postAlimentos,
    patchAlimento,
    
    
}