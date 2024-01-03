import "../assets/css/lote.css"
import { useNavigate } from "react-router-dom";


function Lote(){
    const navigate=useNavigate();
    return(
        <div className="loteContainer">
            <button onclic={()=>navigate('/almacen')}><h2>regresar a almacen</h2></button>
            
        </div>
    )
}
export default Lote;