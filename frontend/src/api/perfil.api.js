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
async function postPerfil (){
    //let data = JSON.stringify({nombre: nombre, apellido: apellido});
    const result = await axios.post("http://localhost:4000/perfil", this.state);
    return result;
}
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
    postPerfil,
    patchPerfil
}
