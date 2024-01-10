import "../assets/css/medicina.css"
import React from "react";
import { postMedicina } from "../api/medicinas.api";
import { useNavigate } from "react-router-dom"

function Medicinas (){
    const navigate = useNavigate();

    const handleSubmit= async (event)=>{
        event.preventDefault();

    const formData = {
        nombreMedicina:event.target.nombreMedicina.value,
        tipoMedicina:event.target.tipoMedicina.value,
        dosisMedicina:event.target.dosisMedicina.value,
        precioMedicina:parseFloat(event.target.precioMedicina.value),
        cantidadMedicina:event.target.cantidadMedicina.value,
        
    }
    console.log("datos del formulario", formData);

    try{
        const response = await postMedicina(formData);
        if(response && response.status === 200){
            // alert("medicina agregada");
            navigate("/admin");
        }else{
            alert("no se agrego la medicina ,verificar los datos")
        }
    }catch{
        // console.error("error al agergar la medicina");
        // alert("error al agregar la medicina , consultar la consola para mas detalles ");
    }
    }

    return(
        <div className="medContainer">
            <button onClick={()=>navigate('/admin')}>
                <h2>regresar a almacen</h2>
            </button>
            <h1 className="titulo">Medicinas</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='nombreMedicina'>nombre:
                <input type='text' name='nombreMedicina' id='nombreMedicina' required/>   
                </label><br/><br/>
            <label htmlFor='tipoMedicina'>tipo:</label>
                <select name="tipoMedicina" id="tipoMedicina">
                    <option value="oral">oral</option>
                    <option value="ocular">ocular</option>
                    <option value="intramuscular">intramuscular</option>
                </select>
                <br/><br/>
            <label htmlFor='dosisMedicina'>numero de dosis:
                <input type='text' name='dosisMedicina' id='dosisMedicina' required/>   
                </label><br/><br/>
            <label htmlFor='precioMedicina'>precio:
                <input type='text' name='precioMedicina' id='precioMedicina' required/>   
                </label><br/><br/>
            <label htmlFor='cantidadMedicina'>Cantidad:
                <input type='text' name='cantidadMedicina' id='cantidadMedicina' required/>   
                </label><br/><br/>
            <button type="submit">guardar</button>
            </form>
        </div>
    )
}
export default Medicinas;

