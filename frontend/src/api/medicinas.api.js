import axios from "axios";

async function getAllMedicinas (){
    try {
        const response = await axios.get('http://localhost:4000/medicina');
        return response.data;
    } catch (error) {
        console.log("error al obtener medicinas",error)
        throw error;
    }
}

async function getMedicina(id) {
    try {
        const response = await axios.get(`http://localhost:4000/medicina/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error al buscar la medicina");
    }
}

async function postMedicina(formData) {
    try {
        const response = await axios.post('http://localhost:4000/medicina',formData);
        if (response.status === 200) {
            if(response.data !==null){
            console.log("medicina agregada correctamente",response.data);
            }else{
                console.log("la respuesta del servidor es null");
            }
            return response.data;
        } else {
            return null;
            // console.log("error al agregar la medicina, verifique los datos");
        }
    } catch (error) {
        if (error.response) {
            console.error("error de respuesta del servidor", error.response.data);
            console.error("codigo de estado", error.response.status);
            console.error("encabezado de respuesta", error.response.headers);
        } else if (error.request) {
            console.error("no se recibio respuesta del servidor")
            console.error("detalles de la soliictud", error.request)
        } else {
            console.error("error en la configuracion de la solicitud", error.message)
        }
    }
    // alert("No se pudo agregar, verificar los datos")
        throw error;
}

async function patchMedicina(id,medData) {
    try {
        const result = await axios.patch(`http://localhost:4000/medicina/${id}`, medData)
        return result;
    } catch (error) {
        console.error("No se pudo actualizar, verificar los datos o el id")
        
    }
}

async function deleteMedicina(id) {
    try {
        const result=await axios.delete(`http://localhost:4000/medicina/${id}`)
        console.log("respuesta del servidor",result);
        return result;
    } catch (error) {
        console.log("Eliminación fallida", error);
    }
}

export {
    getAllMedicinas,
    getMedicina,
    postMedicina,
    patchMedicina,
    deleteMedicina
}