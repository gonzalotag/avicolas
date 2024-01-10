import "../assets/css/almacen.css"
import { useNavigate } from "react-router-dom";

function Almacen (){

    const navigate = useNavigate();

    return (
    <div className="almacenContainer">
        <div><h2>datos de lote</h2></div>
        <button onClick={()=> navigate('/lote')}>
            <h2>registrar datos de lote </h2></button>
        <div className="loteTabla">
            <table>
                <thead>
                    <tr>
                        <th>Galpones</th>
                        <th>Alimentos</th>
                        <th>Medicinas</th>
                        <th>Pollos recien nacidos</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
        <div><h2>medicinas en almacen</h2></div>
        <button onClick={()=> navigate('/medicinas')}>
            <h2>registrar ingreso de medicinas</h2></button>
            <table>
                <thead>
                    <tr>
                    <th>Nombre medicamento</th>
                    <th>Tipo de medicamento</th>
                    <th>Fecha ingreso</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        <div><h2>galpones en uso</h2></div>
        <button onClick={()=> navigate('/galpon')}>
            <h2>asignar galpones</h2></button>
        <table>
            <thead>
                <tr>
                <th>capacidad</th>
                <th>disponibilidad</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
        <div><h2>alimentos</h2></div>
        <button onClick={()=> navigate('/alimentos')}>
            <h2>registrar alimentos</h2></button>
        <table>
            <thead>
                <tr>
                <th>Datos de provision</th>
                <th>Tipo de alimentos</th>
                <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </div>)
}

export default Almacen;