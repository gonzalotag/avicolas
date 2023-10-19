import { useEffect, useState } from "react";
import { login } from "../api/perfil.api";
import "../assets/css/loginPerfil.css"
import { useNavigate } from "react-router-dom";
import { getRolRequest } from "../api/rol.api";


function LoginPerfil (props){
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const {setIsAuth} = props;
    const navigate = useNavigate();

    // useEffect(()=>{
    //     cleanState()
    // }),[]

    const cleanState = () =>{
        setNombre('');
        setContrasenia('');
    }
    async function infoRol (id_rol) {
        return await getRolRequest(id_rol);
    }
    const onLogin = async() => {
        console.log(nombre);
        console.log(contrasenia);
        const userInfo = (await login(nombre,contrasenia)).data.result[0];
                
        if (userInfo) {
            setIsAuth(true);
            localStorage.setItem('userInfo', JSON.stringify(userInfo)) 
            const rol = await infoRol(userInfo.id_rol)
                console.log(rol.data.tipo)
                //window.location.reload()
                if (rol.data.tipo === "administrador") navigate('/admin')       
        } else {
            alert("usuario o contrasenia incorrectos");
            cleanState();
        }   
    }
    return <div className="loginPerfilContainer">
        <div className="loginContainer">
        <div className="loginTitle">
        <h1>
            login
        </h1>
       
        </div>
        <div className="loginInputs" >
            <div className="loginInput">
            <input 
                type="text"
                value={nombre}
                placeholder="Nombre"
                onChange={(e) =>setNombre(e.target.value)}
            />
            <input
            type= "password"
            value={contrasenia}
            placeholder="Password"
            onChange={(e)=>setContrasenia(e.target.value)}
            />
            </div>
        </div>
        <div className="loginButton">
        <button onClick={onLogin}>
            login
        </button>
        </div>
        </div>
    </div>
    
}

export default LoginPerfil;

