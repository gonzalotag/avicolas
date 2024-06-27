import "../assets/css/peso.css"
import React, { useState } from 'react';
import {useNavigate} from  "react-router-dom";
import {postPeso} from "../api/peso.api.js";

function Peso() {
    const [infoPeso,setInfoPeso]=useState({peso_promedio:''});
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
        if (!infoPeso.peso_promedio || isNaN(parseFloat(infoPeso.peso_promedio))) {
            console.error("el peso promedio no es valido")
            return;
        }
        try {
            const result = await postPeso(infoPeso);
            setInfoPeso({
                peso_promedio:''
            });
            // console.log(result);
        } catch (error) {
            console.error('error al agregar el registro', error);
        }
    }

return(
    <div  className="containerPeso">
        <button onClick={()=>navigate('/admin/almacen')}>
            <h2>Regresar a Almacen</h2>
        </button>
        <h2>Registrar Peso</h2>
        <form className="pesoForm">
            Registrar Peso
                <input  
                    type='text'
                    name='peso_promedio'
                    value={infoPeso.peso_promedio === undefined ? '' : infoPeso.peso_promedio}
                    onChange={(e)=>handlePesoChange(e)}
                    required/> 
                    <br /><br />
                <button
                    type="button" 
                    onClick={(e)=>agregarRegistro(e)}>Agregar Peso
                </button>
        </form>
    </div>
    )
}

export default Peso;