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
async function getPerfilesByRol (id_rol){
    const result = await axios.get("http://localhost:4000/perfil/getEmpleadoByRol/"+id_rol)
    return result.data;
}
async function deletePersona(id){
    const result =  await axios.delete("http://localhost:4000/perfil/" + id);
    return result;
}


async function updatePersona(persona){
    const result = await axios.put("http://localhost:4000/perfil", persona);
    return result;
    }
async function createPersona(persona){  
    const result = await axios.post("http://localhost:4000/perfil", persona);
    return result;
    }
// funcion para REgsitroPersonal
// async function registerPersonal(persona){
//     const result = await axios.post("http://localhost:4000/registro-personal", persona);
//     return result;
//     }
//funcion para registros de personal
// async function registrarRegistrados(registrado){
//     const result = await axios.post("http://localhost:4000/registrar-personal", registrado);
//     return result;
//     }
//funcion para actualizar los registros de personal
// async function actualizarRegistrados(registrado){
//     const result = await axios.put("http://localhost:4000/actualizar-personal", registrado);
//     return result;
//     }
//funcion para eliminar los registros de personal
    
   
    
//funcion para crear nuevo perfil this.state provoca funcionalidad de otra forma
// cambiar this.state
// async function postPerfil (){
//     const result = await axios.post("http://localhost:4000/perfil", this.state);
//     return result;
// }
export const postPerfil = async(data)=>{
    try {
        const result = await axios.post("http://localhost:4000/perfil", data);
        return result;
    } catch (error) {
        console.log('Error al guardar el perfil', error);
        throw error;
    }
};

//funcion para actualizar perfil this.state lo mismo q post
async function patchPerfil(){
    const result = await axios.patch("http://localhost:4000/perfil/"+this.props.match.params
    .id , this.state);
    return result;
}
export{
    login,
    getPerfiles,
    getPerfil,
    getPerfilesByRol,
    deletePersona,
    patchPerfil,
    updatePersona,
    createPersona
}
