import axios from "axios";

async function getAllGastos(){
    const response = await axios.get("http://localhost:4000/gastos");
    return response.data;
}   

async function getGasto(){
    const result = await axios.get("http://localhost:4000/gastos");
    if(result.data.length === 0) throw new Error('No hay gastos');
    else return result.data[0];
}

async function postGasto(infoGastos){
    try{
        const response = await axios.post("http://localhost:4000/gastos",infoGastos);
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
        alert("Error al agregar el gasto");
    }
}

async function patchGasto(id,gastosData){
    try {
        const response = await axios.patchGasto(`http://localhost:4000/gastos/${id}`,gastosData);
        console.log(response.gastosData);
    } catch (error) {
        console.error   ("Error en la petición Patch /gastos/" + error);
    }
}

async function deleteGasto(id){
    try {
        const gastoExistente = await axios.get(`http://localhost:4000/gastos/${id}`);
        if (!gastoExistente.data) {
            console.error('el gasto con id ${id} no existe');
            return;
        }
        const response =await axios.delete(`http://localhost:4000/gastos/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("error al eliminar el gasto ", error);
    }
}
export{
    getAllGastos,
    getGasto,
    postGasto,
    patchGasto,
    deleteGasto,
}