import "../assets/css/gastos.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { postGasto } from "../api/gastos.api"

function Gastos(){

    const [infoGastos, setInfoGastos]=useState({detalle:'',importe:''});
    const [dataGasto,setDataGasto] = useState([]);
    const navigate=useNavigate();

    const handleGastosChange=(e)=>{
        const {name,value} = e.target;
        if (name==='importe'&& !/^\d*$/.test(value)) {
            return;
        }
        setInfoGastos((prevData)=>({
            ...prevData,
            [name] : value
        }));
    };

    const guardarGastos = async (e) =>{
        e.preventDefault();
        try {
            const result = await postGasto(infoGastos);
            setInfoGastos({
                detalle:'',
                importe:'',
            });
            console.log(result);
        } catch (error) {
            console.error("Error al guardar gastos", error);
        }
    }

    return(
        <div className="containerGastos">
            <button onClick={()=>navigate('/admin')}>
                <h2>Regresar a Almacen</h2>
            </button>
            <h2>Registrar Gastos</h2>
            <form className="gastosForm">
                <label htmlFor="">Detalles:</label>
                    <textarea
                        name="detalle"
                        type="text"
                        value={infoGastos.detalle}
                        onChange={(e)=>handleGastosChange(e)}
                        required>
                    </textarea> 
                    <br />
                    <label htmlFor="">Importe:</label>
                    <input 
                        type="text" 
                        value={infoGastos.importe}
                        onChange={(e)=>handleGastosChange(e)}
                        name="importe"
                        required
                    />
                    <br />
                    <button
                        type="button"
                        onClick={(e) => guardarGastos(e)}>
                        Guardar
                    </button>
            </form>
        </div>
    )
}

export default Gastos;