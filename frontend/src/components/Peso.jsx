import "../assets/css/peso.css"
import React, { useState } from 'react';
import {useNavigate} from  "react-router-dom";
import {postPeso} from "../api/peso.api.js";

function Peso() {
    const [infoPeso,setInfoPeso]=useState({peso:''});
    // const [dataPeso,setDataPeso]=useState([]);

    const navigate = useNavigate();

    const handlePesoChange =(e)=>{
        const {name,value} = e.target;
        setInfoPeso((prevData)=>({
            ...prevData,
            [name]:(value)
        }));
    }

    const agregarRegistro = async (e)=>{
        e.preventDefault();
        try {
            const result = await postPeso(infoPeso);
            setInfoPeso({
                peso:''
            });
            // console.log(result);
        } catch (error) {
            console.error('error al agregar el registro', error);
        }
    }

return(
    <div  className="containerPeso">
        <button onClick={()=>navigate("/admin")}>
            <h2>Regresar a Almacen</h2>
        </button>
        <h2>Registrar Peso</h2>
        <form className="pesoForm">
            <h2>Registrar Peso</h2>
                <input  
                    type='text'
                    name='peso'
                    value={infoPeso.peso === undefined ? '' : infoPeso.peso}
                    onChange={(e)=>handlePesoChange(e)}
                    required/> 
                    <br /><br />
                <button
                    type="button" 
                    onClick={(e)=>agregarRegistro(e)}>Agregar Registro
                </button>
        </form>
    </div>
    )
}

export default Peso;