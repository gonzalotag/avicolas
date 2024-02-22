import axios from "axios";

async function getAllGastos(){
    const response = await axios.get("http://localhost:4000/gastos");
    return response;
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

async function deleteGasto(){
    const id = document.querySelector("#idDelete").value;
    try{
        await axios.delete(`http://localhost:4000/gastos/${id}`);
        alert("El gasto se ha eliminado correctamente");
        window.location="index.html"
    } catch(error){
        console.log(error);
        alert("Error al eliminar el gasto");
    }
}
export{
    getAllGastos,
    getGasto,
    postGasto,
    patchGasto,
    deleteGasto,
}