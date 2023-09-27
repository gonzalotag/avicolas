import { useState } from "react";
import { login } from "../api/perfil.api";
import "../assets/css/loginPerfil.css"

function LoginPerfil (props){
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const {setIsAuth} = props;

    const cleanState = () =>{
        setNombre('');
        setContrasenia('')
    }

    const onLogin = async() => {
        console.log(nombre);
        console.log(contrasenia);
        const userInfo = (await login(nombre,contrasenia)).data.result[0];
        // console.log(userInfo);
        if (userInfo) {
            setIsAuth(true);
            localStorage.setItem('userInfo', JSON.stringify(userInfo)) 
            // console.log("funciona");
        } else {
            alert("usuario o contrasenia incorrectos");
            cleanState();
            // console.log("no funciona");
        }
    }
    return <div className="loginPerfilContainer">
        <div className="loginContainer">
        <div className="loginTitle">
        <h1>
            login
        </h1>
        </div>
        <div className="loginInputs">
            <div className="loginInput">
            {/* <p>nombre:</p> */}
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

