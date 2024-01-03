import "../assets/css/almacen.css"
import { useNavigate } from "react-router-dom";

function Almacen (){

    const navigate = useNavigate
    return (
    <div className="almacenContainer">
        <div><h2>datos de lote</h2></div>
        <button onClick={()=> navigate('/lote')}>registrar datos de lote </button>
        <div className="loteTabla">
            <table>
                        <th>Galpones</th>
                        <th>Alimentos</th>
                        <th>Medicinas</th>
                        <th>Pollos recien nacidos</th>
            </table>
        </div>
        <div><h2>medicinas en almacen</h2></div>
        <button onClick={()=> navigate('/medicinas')}>registrar ingreso de medicinas</button>
            <table>
                    <th>Nombre medicamento</th>
                    <th>Tipo de medicamento</th>
                    <th>Fecha ingreso</th>
            </table>
        <div><h2>galpones en uso</h2></div>
        <button onClick={()=> navigate('/galpon')}>asignar galpones</button>
        <table>
                <th>capacidad</th>
                <th>disponibilidad</th>
        </table>
        <div><h2>alimentos</h2></div>
        <button onClick={()=> navigate('/alimentos')}>registrar alimentos</button>
        <table>
                <th>Datos de provision</th>
                <th>Tipo de alimentos</th>
                <th>Cantidad</th>
        </table>
    </div>)
}

export default Almacen;