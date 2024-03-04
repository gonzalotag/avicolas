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
        cantidad_sacos:'',
    });

    const handleChange =(e)=>{
        if (e.target.name === "nombre" && !/^[a-zA-Z\s]*$/.test(e.target.value)) {
            return;
        }
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("datos en el formulario antes de enviar" , formData);
        try {
            const result = await postAlimentos(formData);
            console.log("resultado",result);
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
        if (isValidInput || inputValue ===" ") {
            setFormData({...formData, cantidad :inputValue})
        }
    }

    const handleTipoChange = (e)=>{
        setFormData({...formData, tipo:e.target.value})
    }

    const handleCantidadSacos =(e)=>{
        const inputValue = e.target.value;
        // console.log("valor saco ", inputValue );
        const isValidInput = /^\d+$/.test(inputValue);
        if (isValidInput|| inputValue === ''){
            setFormData({...formData, cantidad_sacos :inputValue });
        }    
    }

    return(
        <div className="alimentosContainer">
            <button onClick={()=>navigate('/admin')}>
                <h2>Regresar a Almacen</h2>
            </button>
            <h2>Registrar Alimentos</h2>
            <form className="alimentosForm" onSubmit= {handleSubmit}>
                <label htmlFor='nombre'>Nombre de Alimentos:
                <input 
                type='text' 
                name='nombre' 
                id='nombre'
                value={formData.nombre} 
                onChange={handleChange}
                required/>   
                </label><br/><br/>
                <label htmlFor='precio'>Precio de Compra:
                <input 
                type='text' 
                name='precio' 
                id='precio' 
                placeholder="decimales separados por '.'" 
                value={formData.precio}
                onChange={handlePrecioChange}
                required/>   
                </label><br/><br/>
                <label htmlFor='cantidad'>Cantidad Adquirida:
                <input 
                type='text' 
                name='cantidad' 
                id='cantidad' 
                value={formData.cantidad}
                onChange={handleCantidadChange}
                required/>   
                </label><br/><br/>
                <label htmlFor="tipo">Tipo de Alimento:
                    <select  
                    name="tipo"  
                    id="tipo"
                    value ={formData.tipo}
                    onChange={handleTipoChange} >
                        <option value="">Seleccionar un Tipo</option>
                        <option value='inicial'>inicial</option>
                        <option value='crecimineto'>crecimiento</option>
                        <option value='final'>final</option>
                    </select>
                </label><br /><br />
                <label htmlFor="cantidadsacos">
                    Sacos Disponibles: 
                    <input 
                    type="text" 
                    name="cantidadsacos"
                    id="cantidadsacos"
                    value={formData.cantidad_sacos}
                    onChange={handleCantidadSacos}
                    />
                </label><br /><br />
                <button type= "submit"> Guardar </button>
            </form>
        </div>)
}
export default Alimentos;