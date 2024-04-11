import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/menu.css"

const Menu =()=>{
    const navigate= useNavigate();   
    return(
        <div className="menu">
            <div onClick={()=>navigate('/medicinas')}>
                <button><h4>Registrar Medicinas</h4></button>
            </div>
            <div onClick={()=>navigate('/galpon')}>            
                <button><h4>Asignar Galpon</h4></button>
            </div>
            <div onClick={()=>navigate('/alimentos')}>
                <button><h4>Registrar Alimentos</h4></button>
            </div>
            <div onClick={()=>navigate('/lote')}>
                <button><h4>Registrar Lote</h4></button>
            </div>
            <div onClick={()=>navigate('/mortalidad')}>
                <button><h4>Registrar Mortalidad</h4></button>
            </div>
            <div onClick={()=>navigate('/peso')}>
                <button><h4>Registrar Peso</h4></button>
            </div>
            <div onClick={()=>navigate('/gastos')}>
                <button><h4>Registrar Gasto</h4></button>
            </div>
        </div>
        
    )                                      
}
export default Menu;