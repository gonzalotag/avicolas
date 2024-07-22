import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/menu.css"

const Menu =({})=>{
    const navigate= useNavigate();   
    return(
        <div className="menu">
            <div onClick={()=>navigate('/medicinas')}>
                <button><h5>Registrar Medicinas</h5></button>
            </div>
            <div onClick={()=>navigate('/galpon')}>            
                <button><h5>Asignar Galpon</h5></button>
            </div>
            <div onClick={()=>navigate('/alimentos')}>
                <button><h5>Registrar Alimentos</h5></button>
            </div>
            <div onClick={()=>navigate('/lote')}>
                <button><h5>Registrar Lote</h5></button>
            </div>
            <div onClick={()=>navigate('/mortalidad')}>
                <button><h5>Registrar Mortalidad</h5></button>
            </div>
            <div onClick={()=>navigate('/peso')}>
                <button><h5>Registrar Peso</h5></button>
            </div>
            <div onClick={()=>navigate('/gastos')}>
                <button><h5>Registrar Gasto</h5></button>
            </div>
        </div>
    )                                      
}
export default Menu;