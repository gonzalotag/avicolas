import { useNavigate } from "react-router-dom";
import "../assets/css/navBar.css"
import { useEffect, useState } from "react";

function NavBar(props){
    const{onLogout, isAuth}= props;

    useEffect (()=>{
    
    }),[isAuth]
    return <div className="navbar">
        <div className="icono">
            granja avicola
        </div>
        <div className="espacioDeNavbar">
            espacio libre
        </div>
        <div className="buttonLogout" >
            {isAuth ? <button onClick={()=>{onLogout()}}>cerrar sesion</button>: null} 
            {/* reemplazar por "null" cuando requiera cambio de pagina <button onClick={()=>{navigate('/login')}}> iniciar sesion</button> */}
        </div>
        
    </div>
}
export default NavBar;
