import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/menu.css"

const Menu =()=>{
    const navigate= useNavigate();   
    return(
        <div className="menu">
            <div onClick={()=>navigate('/medicinas')}>
                {/* <h2>Medicinas</h2> */}
                <button><h4>Registrar Medicinas</h4></button>
            </div>
            <div onClick={()=>navigate('/galpon')}>
                {/* <h2>Galpon</h2> */}
                <button><h4>Asignar Galpon</h4></button>
            </div>
            <div onClick={()=>navigate('/alimentos')}>
                {/* <h2>Alimentos</h2> */}
                <button><h4>Registrar Alimentos</h4></button>
            </div>
            <div onClick={()=>navigate('/lote')}>
                {/* <h2>Lote</h2> */}
                <button><h4>Registrar Lote</h4></button>
            </div>
        </div>
        
    )
}
export default Menu;