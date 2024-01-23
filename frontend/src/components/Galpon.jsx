import "../assets/css/galpon.css"
import { useNavigate } from "react-router-dom";
import { postGalpones } from "../api/galpones.api";
import { useState } from "react";

function Galpon (){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        num_gallina:"",
        capacidad:"",
        disponible:"si",
    });

    const handleChange = (e) =>{
        const value = e.target.name === "disponible" ? e.target.value :e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const result = await postGalpones(formData);
            console.log(result);
        } catch (error) {
            console.error("error al enviar datos al servidor ", error );
        }
    }
    return(
    <div className="galponContainer">
        <button onClick={()=>navigate('/admin')}>
            <h2>regresar a almacen</h2>
        </button>
        <h1>Galpon</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor='num_gallina'>numero de gallinas:
            <input 
            type='text' 
            name='num_gallina' 
            id='num_gallina' 
            value={formData.num_gallina}
            onChange={handleChange}
            required/>   
        </label><br/><br/>
        <label htmlFor='capacidad'>capacidad:
            <input 
            type='text' 
            name='capacidad' 
            id='capacidad' 
            value={formData.capacidad}
            onChange={handleChange}
            required/>   
        </label><br/><br/>
        <label htmlFor='disponible'>disponible:
            <select 
            name="disponible" 
            id="disponible"
            value={formData.disponible}
            onChange={handleChange}
            >
                <option value="si ">si </option>
                <option value="no ">no </option>
            </select>
        </label>
        <br/><br/>
        <button type="submit"> guardar</button>
        </form>
    </div>
    )
}
export default Galpon;