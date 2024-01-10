import axios from "axios";

async function getGalpones() {
    const response = await axios.get("httpm://localhost:4000/galpon");
    return response;    
}

async function getGalpon(id) {
    const response = await axios.get(`http://localhost:4000/galpon/${id}`);
        return response.data;
}
async function postGalpon(data){
    try {
        const result = await axios.post("http://localhost:4000/galpon",data);
        return result.data;            
    } catch (error) {
        console.log("error al guardar el nuevo galpon",error);
        throw error;
    }
}

async function patchGalpon(id,galponData) {
    try {
        const result = await axios.patch(`http://localhost:4000/galpon/${id}`,galponData);
        return result.galponData;
    } catch (error) {
        console.error('error al hacer solicitud patch',error);
        throw error;
    }
}
async function deleteGalpon(id) {
    try {
        
        const res =await axios.delete(`http://localhost:4000/galpon/${id}`);
        //console.log(res.data);
        if(!res.data.success)
            throw new Error(res.data.message);
        else{
            return `Se ha eliminado correctamente el Galpón ${id}`;
            }
    } catch (error) {
        return  error.response.data.message;
        }
        
    }

 export {
    getGalpones,
    getGalpon,
    postGalpon,
    patchGalpon,
    deleteGalpon,
 }