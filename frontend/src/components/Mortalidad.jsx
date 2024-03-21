import "../assets/css/mortalidad.css"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postMortalidad } from "../api/mortalidad.api";


function Mortalidad(){
    const [mostrarMortalidad, setMostrarMortalidad]=useState(false);
    const [mortalidadData, setMortalidadData]=useState({cantidad:'',causa:'',descripcion:''});
    const navigate=useNavigate();

    const handleMortalidadChange = (e) =>{
        const {name,value}= e.target;
        if (name==='cantidad' && !/^\d*$/.test(value)) {
            return;
        }
        setMortalidadData((prevData)=>({
            ...prevData,
            [name]: value
        }));  
    };

    const guardarMortalidad = async (e) =>{
        e.preventDefault();
        try {
            const result = await postMortalidad(mortalidadData);
            setMortalidadData({
                cantidad:'',
                causa:"natural",
                descripcion:'',
            });
            console.log(result);
        } catch (error) {
            console.log ('Error al crear mortalidad',error);
        }
    }

    return(
        <div className="mortalidadContainer">
            <button onClick={()=>navigate('/admin')}>
                <h2>Regresar a Almacen</h2>
            </button>
            <h2>Casos de Mortalidad a Registrar</h2>
            <form className="mortalidadForm" onSubmit= {guardarMortalidad} > 
                <label>Cantidad</label>
                    <input 
                        type="text"
                        value={mortalidadData.cantidad}
                        onChange={(e)=>handleMortalidadChange(e)}
                        name="cantidad"
                        required
                    />
                <label>Causa</label>
                    <select name="causa"
                        value={mortalidadData.causa}
                        onChange={(e) => handleMortalidadChange(e)} 
                        required
                    >   
                        <option value=""></option>
                        <option value="natural">Natural</option>
                        <option value="enfermedad">Enfermedad</option>
                        <option value="accidente">Accidente</option>
                        <option value="parasitos">Parasitos</option>
                        <option value="mala alimentacion">Mala alimentacion</option>
                        <option value="ataques de depredadores">Ataques de depredadores</option>
                    </select>
                    <br />
                    <label>Descripcion</label>
                        <textarea 
                            name="descripcion"
                            value={mortalidadData.descripcion}
                            onChange={(e) => handleMortalidadChange(e)}
                            required
                        ></textarea>
                    <br />
                <button type="button" onClick ={(e)=>guardarMortalidad(e)}
                >Guardar </button>
            </form>
        </div>
    )

}
export default Mortalidad;