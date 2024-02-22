import "../assets/css/alimentos.css"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {  postAlimentos } from "../api/alimentos.api";


function Alimentos (){
    const navigate = useNavigate();
    
    const [formData , setFormData] = useState({
        nombre:'',
        precio:'',
        cantidad:'',
        tipo:'',
        cantidadSacos:'',
    });

    const handleChange =(e)=>{
        if (e.target.name === "nombre" && !/^[a-zA-Z\s]*$/.test(e.target.value)) {
            return;
        }
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const result = await postAlimentos(formData);
            console.log(result);
        } catch (error) {
            console.error('error al enviar datos al servidor', error.message);
        }
    }

    const handlePrecioChange = (event) =>{
        const inputValue = event.target.value;
        const isValidInput= /^\d+(\.\d*)?$/.test(inputValue);
        if (isValidInput || inputValue === ""){
            setFormData({ ...formData, precio: inputValue });
        }
    }
    
    const handleCantidadChange =(event)=>{
        const inputValue = event.target.value;
        const isValidInput = /^\d+$/.test (inputValue);
        if (isValidInput || inputValue ==="") {
            setFormData({...formData, cantidad:inputValue})
        }
    }

    const handleTipoChange = (e)=>{
        setFormData({...formData, tipo:e.target.value})
    }

    const handleCantidadSacos =(e)=>{
        const inputValue = e.target.value;
        const isValidInput = /^\d+$/.test(inputValue);
        if (isValidInput|| inputValue ===''){
            setFormData({...formData,cantidadSacos:inputValue});
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
                <label htmlFor='precio'>precio de compra:
                <input 
                type='text' 
                name='precio' 
                id='precio' 
                placeholder="decimales separados por '.'" 
                value={formData.precio}
                onChange={handlePrecioChange}
                required/>   
                </label><br/><br/>
                <label htmlFor='cantidad'>cantidad adquirida:
                <input 
                type='text' 
                name='cantidad' 
                id='cantidad' 
                value={formData.cantidad}
                onChange={handleCantidadChange}
                required/>   
                </label><br/><br/>
                <label htmlFor="tipo">tipo de alimento:
                    <select  
                    name="tipo"  
                    id="tipo"
                    value ={formData.tipo}
                    onChange={handleTipoChange} >
                        <option value='inicial'>inicial</option>
                        <option value='crecimineto'>crecimiento</option>
                        <option value='final'>final</option>
                    </select>
                </label><br /><br />
                <label htmlFor="cantidadSacos">
                    sacos disponibles: 
                    <input 
                    type="text" 
                    name="cantidadSacos"
                    id="cantidadSacos"
                    value={formData.cantidadSacos}
                    onChange={handleCantidadSacos}
                    />
                </label><br /><br />
                <button type= "submit"> Guardar </button>
            </form>
        </div>)
}
export default Alimentos;