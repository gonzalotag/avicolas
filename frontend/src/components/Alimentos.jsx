import "../assets/css/alimentos.css"
import React from 'react'
import { useNavigate } from "react-router-dom"

function Alimentos (){
    const navigate = useNavigate();





    
    return(
        <div className="alimentosContainer">
            <button onClick={()=>navigate('/admin')}>
                regresar a almacen
            </button>
            <h2>registrar alimentos</h2>
            <form action="">
                <label htmlFor='nombre'>nombre de alimentos:
                <input type='text' name='name' id='nombre' required/>   
                </label><br/><br/>
                <label htmlFor='nombre'>precio:
                <input type='text' name='name' id='nombre' required/>   
                </label><br/><br/>
                <label htmlFor='nombre'>stock:
                <input type='text' name='name' id='nombre' required/>   
                </label><br/><br/>
                <label htmlFor='nombre'>fecha de vencimiento:
                <input type='text' name='name' id='nombre' required/>   
                </label><br/><br/>
            </form>
        </div>)
}
export default Alimentos;