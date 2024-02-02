import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/menu.css"

const Menu =()=>{
    const navigate= useNavigate();   
    return(
        <div className="menu">
            <div onClick={()=>navigate('/medicinas')}>
                {/* <h2>Medicinas</h2> */}
                <button>registrar ingreso de medicinas</button>
            </div>
            <div onClick={()=>navigate('/galpon')}>
                {/* <h2>Galpon</h2> */}
                <button>asignar galpon</button>
            </div>
            <div onClick={()=>navigate('/alimentos')}>
                {/* <h2>Alimentos</h2> */}
                <button>registrar alimentos</button>
            </div>
            <div onClick={()=>navigate('/lote')}>
                {/* <h2>Lote</h2> */}
                <button>registrar lote</button>
            </div>
        </div>
        
    )
}
export default Menu;