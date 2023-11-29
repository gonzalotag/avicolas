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
            console.log(result.data[0]);
            return result.data[0];
            };
}

export const getPerfilesById = async (id)=>{
 try{
     const result = await axios.get(`http://localhost:4000/perfil/${id}`);
     const perfilData ={
        id: result.data.id,
        nombre: result.data.nombre,
        apellido_paterno: result.data.apellido_paterno,
        apellido_materno: result.data.apellido_materno,
        direccion: result.data.direccion,
        telefono: result.data.telefono,
        email: result.data.email,
        estado: result.data.estado,
        contrasenia: result.data.contrasenia,
     }
     return perfilData;
 }catch(error){
 console.error('error al obtener el perfil por id' , error)
 }
}
    
  
// export const getPerfilesById = async (id) =>{
//     try {
//         const result = await axios.get(`http://localhost:4000/perfil/${id}`);
//         return result.data;
//     } catch (error) {
//         console.error('error al obtener el perfil por id', error)
//         throw error;
//     }
// };
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

//funcion para actualizar perfil this.state lo mismo q post
// async function patchPerfil(){
//     const result = await axios.patch("http://localhost:4000/perfil/"+this.props.match.params.id , this.state);
//     return result;
// }

//funcion que actualiza la tabla perfil
async function patchPerfil(id,perfilData){
    const result = await axios.patch(`http://localhost:4000/perfil/${id}`, perfilData);
    return result;
}

export{
    login,
    getPerfiles,
    getPerfil,
    getPerfilesByRol,
    // getPerfilesById,
    deletePersona,
    patchPerfil,
}
