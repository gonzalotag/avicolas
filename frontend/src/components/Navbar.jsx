import { useNavigate } from "react-router-dom";
import "../assets/css/navBar.css"
import { useEffect, useState } from "react";

function Navbar(props){
    const{onLogout, isAuth}= props;
    const navigate = useNavigate();
    const [estado, setEstado] = useState(isAuth);
    // const [boton, setBoton] = useState(<button onClick={()=>{navigate('/login')}}> iniciar sesion</button>) 
    useEffect (()=>{
        // if(isAuth === true ){
        //     setBoton(<button onClick={()=>{onLogout()}}>cerrar sesion</button>)
        // }
    }),[isAuth]
    return <div className="navbar">
        <div className="icono">
            granja avicola
        </div>
        <div className="espacioDeNavbar">
            espacio libre
        </div>
        <div className="buttonLogout" >
            {isAuth ? <button onClick={()=>{onLogout()}}>cerrar sesion</button>: <button onClick={()=>{navigate('/login')}}> iniciar sesion</button>}
            {/* {
                boton
            } */}
        </div>
        
    </div>
}

export default Navbar;