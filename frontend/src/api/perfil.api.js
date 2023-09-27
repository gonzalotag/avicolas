import axios from "axios";

async function login (nombre,contrasenia) {
    const body = {nombre: nombre, contrasenia: contrasenia}
    const result= await axios.post("http://localhost:4000/login", body)
    return result;
};

export{
    login
}