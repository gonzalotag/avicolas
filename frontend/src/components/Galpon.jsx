import "../assets/css/galpon.css"
import { useNavigate } from "react-router-dom";
import { postGalpones } from "../api/galpones.api";
import { useState } from "react";

function Galpon (){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        num_galpon:"",
        capacidad:"",
        disponible:"si",
    });

    const handleChange = (e) =>{
        let value = e.target.name === "disponible" ? e.target.value :e.target.value;
        if(e.target.name === "num_galpon"||e.target.name === "capacidad" ){
            value=value.replace(/[^0-9]/g,"");
        }
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
            setFormData({
                num_galpon: "",
                capacidad: "",
                disponible: "si",
            })
        } catch (error) {
            console.error("error al enviar datos al servidor ", error );
        }
    }
    return(
    <div className="galponContainer">
        <button onClick={()=>navigate('/admin/almacen')}>
            <h2>Regresar a Almacen</h2>
        </button>
        <h1>Galpon</h1>
        <form className="galponForm" onSubmit={handleSubmit}>
        <label htmlFor='num_galpon'>Numero de Galpon:
            <input 
            type='text' 
            name='num_galpon' 
            id='num_galpon' 
            value={formData.num_galpon}
            onChange={handleChange}
            pattern="[0-9]*"
            required/>   
        </label><br/><br/>
        <label htmlFor='capacidad'>Capacidad:
            <input 
            type='text' 
            name='capacidad' 
            id='capacidad' 
            value={formData.capacidad}
            onChange={handleChange}
            pattern="[0-9]*"
            required/>   
        </label><br/><br/>
        <label htmlFor='disponible'>Disponible:
            <select 
            name="disponible" 
            id="disponible"
            value={formData.disponible}
            onChange={handleChange}
            >
                <option value=""></option>
                <option value="1">Si </option>
                <option value="0">No </option>
            </select>
        </label>
        <br/><br/>
        <button type="submit"> Guardar</button>
        </form>
    </div>
    )
}
export default Galpon;