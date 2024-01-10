import "../assets/css/galpon.css"
import { useNavigate } from "react-router-dom";
function Galpon (){
    const navigate = useNavigate();
    return(
    <div className="galponContainer">
        <button onClick={()=>navigate('/admin')}>
            regresar a lamacen
        </button>
        <h1>Galpon</h1>
        <label htmlFor='nombre'>numemor de gallinas:
            <input type='text' name='name' id='nombre' required/>   
        </label><br/><br/>
        <label htmlFor='nombre'>capacidad:
            <input type='text' name='name' id='nombre' required/>   
        </label><br/><br/>
        <label htmlFor='nombre'>disponible:</label>
             <select name="disponible" id="disponible">
                <option value="si ">si </option>
                <option value="no ">no </option>
             </select>
        <br/><br/>
    </div>
    )
}
export default Galpon;