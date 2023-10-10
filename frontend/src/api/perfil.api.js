import axios from "axios";

async function login (nombre,contrasenia) {
    const body = {nombre: nombre, contrasenia: contrasenia}
    const result= await axios.post("http://localhost:4000/login", body)
    return result;
};



async function getPerfiles (){
    const result = await axios.get("http://localhost:4000/perfil")
    return result;
}
async function getPerfilesByRol (id_rol){
    const body = {id_rol: id_rol}
    const result = await axios.get("http://localhost:4000/perfil", body)
    return result;
}
export{
    login,
    getPerfiles,
    getPerfilesByRol
}