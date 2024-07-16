import "../assets/css/tablaProduccion.css"
import React, { useState } from "react";
import { FormatFecha } from "./FormatFecha";

function TablaProduccion({
    handleControlButton, 
    actividadControl, 
    mostrarMortalidad =[], 
    dataAlimento, 
    dataMed, 
    dataGasto, 
    dataPeso, 
    dataLote, 
    asingEmpleado, 
    handleSeleccionEnProduccion,
    dataGalpon,
    seleccionPorSeccion
}){

const isFilaSeleccionada = (fila, seccion )=>{
    return seleccionPorSeccion[seccion]?.some(item=> item.fila.id === fila.id);
}
const renderRows =(data, seccion, campos ) =>{
    if (!Array.isArray(data)) {
       return null; 
    }
    return data.map((fila) => (
        <tr key={fila.id}>
            {campos.map((campo) => (
                <td key={campo}>{fila[campo]}</td>
            ))}
            <td>
                <button onClick={()=>handleSeleccionEnProduccion(fila,seccion)}
                disabled={isFilaSeleccionada(fila,seccion)}>Seleccionar</button>
            </td>
        </tr>
    ));
}


const handleSeleccion =(fila,seccion,datos)=>{
    if (fila && fila.id) {
        handleSeleccionEnProduccion(fila, seccion,datos);    
    }
}
const renderSubtabla = () => {
    switch(actividadControl){
        case "Mortalidad":
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Causa</th>
                            <th>Descripcion</th>
                            {/* <th>Registro de mortalidad</th> */}
                            <th>Seleccion</th>
                        </tr>
                    </thead>
                <tbody>
                    {renderRows(mostrarMortalidad,"Mortalidad",["cantidad","causa","descripcion",] )}
                </tbody>
                </table>
            );
        case "Alimentacion":
            return (
                <table>
                    <thead>
                        <tr>
                            <th >Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th>Sacos disponibles</th>
                            <th>Seleccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(dataAlimento, "Alimentacion",["nombre","precio","cantidad","tipo","cantidad_sacos"])}
                    </tbody>
                </table>
            );
        case "Medicaciones":
            return(
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Via de administracion</th>
                            <th>Dosis / dia</th>
                            <th>Precio</th>
                            <th>Cantidad en almacen</th>
                            {/* <th>Fecha compra</th> */}
                            <th>Seleccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(dataMed,"Medicaciones",["nombre","via","num_dosis","precio","cantidad",])}
                    </tbody>
                </table>
            );
        case "Gastos":
            return(
            <table className="tablaGastos">
            <thead>
                <tr>
                    <th>Gastos</th>
                    <th>Importe</th>
                    {/* <th>Fecha de importe</th> */}
                    <th>Seleccion</th>
                </tr>
            </thead>
            <tbody>
                {renderRows(dataGasto,"Gastos",["detalle","importe",])}
            </tbody>
            </table>
            );
        case "Peso":
            return(
                <table>
                <thead>
                <tr>
                    <th>Peso promedio</th>
                    {/* <th>Fecha de medicion</th> */}
                    <th>Seleccion</th>
                </tr>
                </thead>
                <tbody>
                    {renderRows(dataPeso, "Peso",["peso_promedio",])}
                </tbody>
                </table>
            );
        case "Lote":
            return(
                <table>
                <thead>
                <tr >
                    <th>Raza</th>
                    <th>Cantidad</th>
                    <th>Valor Unidad</th>
                    <th>Seleccion</th>
                </tr>
                </thead>
                <tbody>
                    {renderRows(dataLote, "Lote",["raza","cantidad","valor_unidad"])}
                </tbody>
                </table>
            );
        case "Empleado":
            return(
                <table>
                    <thead>
                        <tr>
                            <th>Nombre:</th>
                            <th>Apellido Paterno:</th>
                            <th>Apellido Materno:</th>
                            <th>Seleccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(asingEmpleado, "Empleado",["nombre", "apellido_paterno","apellido_materno"])}
                        
                    </tbody>
                </table>
            );
        case "Galpon":
            return(
                <table>
                    <thead>
                        <tr>
                            <th>Numero de Galpón:</th>
                            <th>Capacidad</th>
                            <th>Disponibilidad</th>
                            <th>Seleccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(dataGalpon,"Galpon",["num_galpon","capacidad","disponible"])}
                    </tbody>
                </table>
            );
        default:
            return null;
    }
}

    return(
        <div>
            <div className="tablaProduccion">
                <div className="menuTablaProd">
                    <div>
                    <button className={actividadControl==="Alimentacion" ? "active" :""}
                        onClick={()=>handleControlButton("Alimentacion")}>
                        <h4>Alimentacion</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Medicaciones" ? "active" :""}
                        onClick={()=>handleControlButton("Medicaciones")}>
                        <h4>Medicaciones</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Mortalidad" ? "active" :""}
                        onClick={()=>handleControlButton("Mortalidad")}>
                        <h4>Mortalidad</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Peso" ? "active" :""}
                        onClick={()=>handleControlButton("Peso")}>
                        <h4>Peso</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Gastos" ? "active" :""}
                        onClick={()=>handleControlButton("Gastos")}>
                        <h4>Gastos</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Lote" ? "active" :""}
                        onClick={()=>handleControlButton("Lote")}>
                        <h4>Lote</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Empleado" ? "active" :""}
                        onClick={()=>handleControlButton("Empleado")}>
                        <h4>Empleado</h4>
                    </button>
                    </div>
                    <div>
                    <button className={actividadControl==="Galpon" ? "active" :""}
                        onClick={()=>handleControlButton("Galpon")}>
                        <h4>Galpon</h4>
                    </button>
                    </div>
                </div>
                <div>
                    {renderSubtabla()}
                </div>
            </div>
        </div>
    );
}
export default TablaProduccion;