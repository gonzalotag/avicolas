import "../assets/css/lote.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLote } from "../api/lotes.api.js";


function Lote(){
    const navigate=useNavigate();
    const [formData, setFormData]=useState({
        raza:"",
        cantidad:"",
        valor_unidad:""
    });
    const handelInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleCantidadChange =(event)=>{
        const inputValue = event.target.value;
        const isValidInput = /^\d+$/.test (inputValue);
        if (isValidInput || inputValue ==="") {
            setFormData({...formData, cantidad:inputValue})
        }
    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        try {
            const result = await postLote(formData);
            console.log("nuevo lote creado",result);
        
        } catch (error) {
            console.error("error al crear lote",error);
        }
    }
    const handleUnidadChange = (event) =>{
        const inputValue = event.target.value;
        const isValidInput= /^\d+(\.\d*)?$/.test(inputValue);
        if (isValidInput || inputValue === ""){
            setFormData({ ...formData, valor_unidad: inputValue });
        }
    }
    return(
        <div className="loteContainer">
            <button onClick={()=>navigate('/admin')}>
                <h2>regresar a almacen</h2>
            </button>
            <h2>lote a registrar</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor='raza'>raza:
                <select 
                name='raza'
                id='raza' 
                value={formData.raza}
                onChange={handelInputChange}>
                <option value="">selecciona una raza</option>
                <option value="plymouth rock">plymouth rock</option>
                <option value="cornish">cornish</option>
                <option value="sussex clara">sussex clara</option>
                <option value="new hampshire">new hampshire</option>

                </select>
                </label><br/><br/>
                
                <label htmlFor='cantidad'>cantidad:
                <input 
                type='text' 
                name='cantidad'
                id='cantidad' 
                value={formData.cantidad}
                onChange={handleCantidadChange}
                required/>   
                </label><br/><br/>
                <label htmlFor='valor_unidad'>valor unidad:
                <input 
                type='text' 
                name='valor_unidad' 
                id='valor_unidad' 
                value={formData.valor_unidad}
                onChange={handleUnidadChange}
                required/>   
                </label><br/><br/>
                <button type="submit">guardar</button>
                </form>
        </div>
    )
}
export default Lote;