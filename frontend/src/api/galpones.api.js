import axios from "axios";

async function getAllGalpones() {
    try {
        const response = await axios.get("http://localhost:4000/galpones");
        // console.log('respuesta del api', response.data);
    if (Array.isArray(response.data)) {
        return response.data;
    }else{
        return [];
    }    
    } catch (error) {
        throw error;   
    }
}

async function getGalpon(id) {
    const response = await axios.get(`http://localhost:4000/galpones/${id}`);
        return response.data;
}
async function postGalpones(formData){
    try {
        const result = await axios.post("http://localhost:4000/galpones", formData);
        return result.data;            
    } catch (error) {
        // throw error;
    }
}

async function patchGalpon(id,galponData) {
    try {
        const result = await axios.patch(`http://localhost:4000/galpones/${id}`,galponData);
        return result.galponData;
    } catch (error) {
        console.error('error al hacer solicitud patch',error);
        throw error;
    }
}
async function deleteGalpon(id) {
    try {
        const res =await axios.delete(`http://localhost:4000/galpones/${id}`);
        console.log('resp del server',res.data);
        return res;
    } catch (error) {
        return  error.response.data.message;
        }
        
    }

 export {
    getAllGalpones,
    getGalpon,
    postGalpones,
    patchGalpon,
    deleteGalpon,
 }