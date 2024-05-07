import React, {useState} from "react";

function VentanaEdicion ({datosEditar, onClose, onSave}){

    const [datosEditados,setDatosEditados]=useState(datosEditar);

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setDatosEditados({...datosEditados, [name]:value});
    }

    const handleGuardar =()=>{
        onSave(datosEditados);
        // onClose();
    }

    const handleCancelar =()=>{
        onClose();
    }
    return(
        <div className="ventanaEmergente">
            <h2>Edición de Datos</h2>
            <form onSubmit={handleGuardar}>
                <input 
                type="text"
                name="nombre"
                value={datosEditados.name || ""}
                onChange={handleChange}
                />
            </form>
             <button type="submit">Guardar</button>
             <button onClick={handleCancelar}>Cancelar</button>
        </div>
    )

}

export default VentanaEdicion