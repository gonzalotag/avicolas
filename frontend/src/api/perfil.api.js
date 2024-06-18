import axios from "axios";

async function login (nombre,contrasenia) {
    const body = {nombre: nombre, contrasenia: contrasenia}
    const result= await axios.post("http://localhost:4000/login", body)
    return result;
};
async function getPerfiles (){
    const result = await axios.get("http://localhost:4000/perfil")
    return result.data;
}
async function getPerfil(){
    let perfil = localStorage.getItem('id');
    if(perfil==null || perfil=="undefined"||perfil=="null"){
        alert("No hay un usuario logueado");
        }else{
            const result = await axios.get(`http://localhost:4000/perfil/${perfil}`);
            // console.log(result.data[0]);
            return result.data[0];
            };
}

export const getPerfilesById = async (id)=>{
 try{
    const result = await axios.get(`http://localhost:4000/perfil/${id}`); 
    //una vez que se recibe los datos de .get se extraen y transforman los datos del perfil 
    //y se los almacena dentro de perfilData
    const perfilData ={
        id: result.data.id,
        nombre: result.data.nombre,
        apellido_paterno: result.data.apellido_paterno,
        apellido_materno: result.data.apellido_materno,
        direccion: result.data.direccion,
        telefono: result.data.telefono,
        email: result.data.email,
    }
    // console.log('perfil data', perfilData);
    return perfilData;
 }catch(error){
 console.error('error al obtener el perfil por id' , error,message);
//  console.log(error.response);
 if (error.response) {
    console.log('response data',error.response.data);
    console.log('response status ',error.response.status);
    console.log('response headers',error.response.headers);
}
 throw error;
 }
}
    
async function getPerfilesByRol (id_rol){
    const result = await axios.get("http://localhost:4000/perfil/getEmpleadoByRol/"+id_rol)
    return result.data;
}

async function deletePersona(id){
    const result =  await axios.delete("http://localhost:4000/perfil/" + id);
    return result;
}

export const postPerfil = async(data)=>{
    try {
        const result = await axios.post("http://localhost:4000/perfil", data);
        return result.data;
    } catch (error) {
        console.log('Error al guardar el perfil', error);
        throw error;
    }
};

async function patchPerfil(id,perfilData,callback){
    try {
        const result = await axios.patch(`http://localhost:4000/perfil/${id}`, perfilData);
        if(callback && typeof callback === 'function'){
            callback({status:200 ,data: result.data});
        }
        return result.data;    
    } catch (error) {
        console.error('error al hacer solicitud patch',error);
        if(callback && error.response){
            console.log('codigo estado', error.response.status);
            callback({status: error.response.status , data :null});
        }else if (callback){
            callback({status: 500,data:null});
        }
        return null;
    }
}

export{
    login,
    getPerfiles,
    getPerfil,
    getPerfilesByRol,
    deletePersona,
    patchPerfil,
}
