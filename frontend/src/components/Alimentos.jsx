import "../assets/css/alimentos.css"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { postAlimentos } from "../api/alimentos.api";

function Alimentos (){
    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        nombre:'',
        precio:'',
        stock:'',
        
    });

    const handleChange =(e)=>{
        setFormData({
            ...formData,
                [e.target.name]: e.target.value
            
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const result = await postAlimentos(formData);
            console.log(result);
        } catch (error) {
            console.error('error al enviar datos al servidor', error)
        }
    }

    return(
        <div className="alimentosContainer">
            <button onClick={()=>navigate('/admin')}>
                <h2>regresar a almacen</h2>
            </button>
            <h2>registrar alimentos</h2>
            <form onSubmit= {handleSubmit}>
                <label htmlFor='nombre'>nombre de alimentos:
                <input 
                type='text' 
                name='nombre' 
                id='nombre'
                value={formData.nombre} 
                onChange={handleChange}
                required/>   
                </label><br/><br/>
                <label htmlFor='precio'>precio:
                <input 
                type='text' 
                name='precio' 
                id='precio' 
                value={formData.precio}
                onChange={handleChange}
                required/>   
                </label><br/><br/>
                <label htmlFor='stock'>stock:
                <input 
                type='text' 
                name='stock' 
                id='stock' 
                value={formData.stock}
                onChange={handleChange}
                required/>   
                </label><br/><br/>
                <button type= "submit"> Guardar </button>
            </form>
            
        </div>)
}
export default Alimentos;