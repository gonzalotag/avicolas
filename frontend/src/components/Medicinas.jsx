import "../assets/css/medicina.css"
import React,{ useState} from "react";
import { postMedicina } from "../api/medicinas.api";
import { useNavigate } from "react-router-dom"

function Medicinas (){
    const navigate = useNavigate();
    
    const [formData,setFormData]= useState({
        nombreMedicina:"",
        tipoMedicina:"oral",
        dosisMedicina:"",
        precioMedicina:"",
        cantidadMedicina:"",
    });
   
    const handleChange = (event)  =>{
        const {name ,value} = event.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit= async (event) =>{
        event.preventDefault();
        try{
            const response = await postMedicina(formData);
            console.log("se guardo la informacion",response);
            
            alert("Se agrego correctamente");
        }catch(error){
        console.error("error al agergar la medicina",error);
        alert("error al agregar la medicina , consultar la consola para mas detalles ");
        }
    }
    const handlePrecioChange = (event) =>{
        const inputValue = event.target.value;
        const isValidInput= /^\d+(\.\d*)?$/.test(inputValue);
        if (isValidInput || inputValue === ""){
            setFormData({ ...formData, precioMedicina: inputValue });
        }
    }
    const handleInputChange =(event,campo )=>{
        const inputValue = event.target.value;
        const isValidInput = /^\d+$/.test (inputValue);
        if (isValidInput || inputValue ==="") {
            setFormData({...formData, [campo]:inputValue})
        }
    }
    
    return(
        <div className="medContainer">
            <button onClick={()=>navigate(`/admin/`)}>
                <h2>regresar a almacen</h2>
            </button>
            <h1 className="titulo">Medicinas</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='nombreMedicina'>nombre:
                <input 
                type='text' 
                name='nombreMedicina' 
                id='nombreMedicina' 
                value={formData.nombreMedicina}
                onChange={handleChange}
                required/>   
                </label><br/><br/>
            <label htmlFor='tipoMedicina'>tipo:</label>
                <select 
                name="tipoMedicina" 
                id="tipoMedicina"
                value={formData.tipoMedicina}
                onChange={handleChange}
                >
                    <option value="oral">oral</option>
                    <option value="ocular">ocular</option>
                    <option value="intramuscular">intramuscular</option>
                </select>
                <br/><br/>
            <label htmlFor='dosisMedicina'>numero de dosis:
                <input type='text' 
                name='dosisMedicina' 
                id='dosisMedicina' 
                value={formData.dosisMedicina}
                onChange={(e)=>handleInputChange(e,'dosisMedicina')}
                required/>   
                </label><br/><br/>
            <label htmlFor='precioMedicina'>precio:
                <input type='text' 
                name='precioMedicina' 
                id='precioMedicina'
                placeholder="data separado por punto"
                value={formData.precioMedicina}
                onChange={handlePrecioChange}
                required/>   
                </label><br/><br/>
            <label htmlFor='cantidadMedicina'>Cantidad:
                <input type='text' 
                name='cantidadMedicina' 
                id='cantidadMedicina' 
                value={formData.cantidadMedicina}
                onChange={(e)=>handleInputChange(e,'cantidadMedicina')}
                required/>   
                </label><br/><br/>
            <button type="submit">guardar</button>
            </form>
           
        </div>
    )
}
export default Medicinas;

