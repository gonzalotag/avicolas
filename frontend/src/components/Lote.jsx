import "../assets/css/lote.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function Lote(){
    const navigate=useNavigate();
    return(
        <div className="loteContainer">
            <button onClick={()=>navigate('/admin')}>
                <h2>regresar a almacen</h2>
            </button>
            <h2>lote a registrar</h2>
            <label htmlFor='nombre'>pollos recien nacidos:
                <input type='text' name='name' id='nombre' required/>
                </label><br/><br/>
                <label htmlFor='nombre'>asignar obreros:
                <input type='text' name='name' id='nombre' required/>   
                </label><br/><br/>
                <label htmlFor='nombre'>distribucion de galpones:
                <input type='text' name='name' id='nombre' required/>   
                </label><br/><br/>
        </div>
    )
}
export default Lote;