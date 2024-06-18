import { useNavigate } from "react-router-dom";
import "../assets/css/navBar.css"
import { useEffect, useState } from "react";
import iconChiken from '../assets/images/icons8-gallina-50.PNG';

function NavBar(props){
    const{onLogout, isAuth}= props;

    useEffect (()=>{
    
    }),[isAuth]
    return <div className="navbar">
        <div className="icono">
            <img src={iconChiken} alt="Chiken Icon"/>{""}
            <h3>GRANJA AVICOLA</h3>
        </div>
        <div className="espacioDeNavbar">
            
        </div>
        <div className="buttonLogout" >
            {isAuth ? <button onClick={()=>{onLogout()}}>Cerrar Sesion</button>: null} 
            {/* reemplazar por "null" cuando requiera cambio de pagina <button onClick={()=>{navigate('/login')}}> iniciar sesion</button> */}
        </div>
        
    </div>
}
export default NavBar;
