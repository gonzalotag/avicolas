import "../assets/css/tablaProduccion.css"
import React, { useState } from "react";
import { FormatFecha } from "./FormatFecha";

function TablaProduccion({
    handleControlButton, 
    actividadControl, 
    mostrarMortalidad, 
    dataAlimento, 
    dataMed, 
    dataGasto, 
    dataPeso, 
    dataLote, 
    asingEmpleado, 
    handleSeleccionEnProduccion,
    dataGalpon,
   
}){
const handleSeleccion =(fila,seccion,datos)=>{
    if (fila && fila.id) {
        handleSeleccionEnProduccion(fila, seccion,datos);    
    }
}

    return(
        <div>
        <table className="tablaProduccion">
            <thead>
                <tr>
                <th><button className={actividadControl==="Alimentacion" ? "active" :""}
                            onClick={()=>handleControlButton("Alimentacion")}>
                        <h4>Alimentacion</h4>
                        </button></th>
                        <th><button className={actividadControl==="Medicaciones" ? "active" :""}
                            onClick={()=>handleControlButton("Medicaciones")}>
                        <h4>Medicaciones</h4>
                        </button></th>
                        <th><button className={actividadControl==="Mortalidad" ? "active" :""}
                            onClick={()=>handleControlButton("Mortalidad")}>
                        <h4>Mortalidad</h4>
                        </button></th>
                        <th><button className={actividadControl==="Peso" ? "active" :""}
                            onClick={()=>handleControlButton("Peso")}>
                        <h4>Peso</h4>
                        </button></th>
                        <th><button className={actividadControl==="Gastos" ? "active" :""}
                            onClick={()=>handleControlButton("Gastos")}>
                        <h4>Gastos</h4>
                        </button></th>
                        <th><button className={actividadControl==="Lote" ? "active" :""}
                            onClick={()=>handleControlButton("Lote")}>
                        <h4>Lote</h4>
                        </button></th>
                        <th><button className={actividadControl==="Empleado" ? "active" :""}
                            onClick={()=>handleControlButton("Empleado")}>
                        <h4>Empleado</h4>
                        </button></th>
                        <th><button className={actividadControl==="Galpon" ? "active" :""}
                            onClick={()=>handleControlButton("Galpon")}>
                        <h4>Galpon</h4>
                        </button></th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td colSpan="8">
                        
                        {actividadControl === "Mortalidad" &&(
                            <div>
                                <h3>Mortalidad</h3>    
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Causa</th>
                                        <th>Descripcion</th>
                                        <th>Registro de mortalidad</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarMortalidad && mostrarMortalidad.map((decesos,index)=>(
                                        <tr key={index} > 
                                            <td> {decesos.cantidad} </td>
                                            <td> {decesos.causa} </td>
                                            <td> {decesos.descripcion} </td>
                                            <td> {FormatFecha(decesos.fecha_muerte)} </td>
                                            <td>
                                            <button onClick={ ()=> handleSeleccion(decesos,"Mortalidad",mostrarMortalidad)}>Seleccionar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            )}
                            {actividadControl ==="Alimentacion" &&(
                                <div>
                                    <h3>Informacion Alimentos</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Tipo</th>
                                                <th>Sacos disponibles</th>
                                                <th>Seleccion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataAlimento && dataAlimento.map((alimento,index)=>(
                                        <tr key={index}>
                                        <td>{alimento.nombre}</td>
                                        <td>{alimento.precio}</td>
                                        <td>{alimento.cantidad}</td>
                                        <td>{alimento.tipo}</td>
                                        <td>{alimento.cantidad_sacos}</td>
                                        <td>
                                        <button onClick={()=>handleSeleccion(alimento , "Alimentacion",dataAlimento)}>
                                            Seleccionar
                                        </button>
                                        </td>
                                        </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {actividadControl === "Medicaciones"&&(
                                <div>
                                    <h3>Medicamento</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Via de administracion</th>
                                                <th>Dosis / dia</th>
                                                <th>Precio</th>
                                                <th>Cantidad en almacen</th>
                                                <th>Fecha compra</th>
                                                <th>Seleccion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataMed && dataMed.map((medicinas,index)=>(
                                            <tr key={index}>
                                                <td>{medicinas.nombre}</td>
                                                <td>{medicinas.via}</td>
                                                <td>{medicinas.num_dosis}</td>
                                                <td>{medicinas.precio}</td>
                                                <td>{medicinas.cantidad}</td>
                                                <td>{FormatFecha(medicinas.fecha_ingreso)}</td>
                                                <td>
                                                <button onClick={()=> handleSeleccion(medicinas,"Medicaciones",dataMed)}>
                                                    Seleccionar
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {actividadControl === "Gastos" && (
                                <div>
                                <h3>Registro de gastos</h3>
                                <table className="tablaGastos">
                                <thead>
                                    <tr>
                                        <th>Gastos</th>
                                        <th>Importe</th>
                                        <th>Fecha de importe</th>
                                        <th>Seleccion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataGasto && Array.isArray(dataGasto) && dataGasto.map((importes,index)=>(
                                        <tr key ={index}>
                                            <td> {importes.detalle} </td>
                                            <td> {importes.importe} $</td>
                                            <td> {FormatFecha(importes.fecha_gasto)} </td>  
                                            <td>
                                            <button onClick={ ()=> handleSeleccion
                                                (importes,"Gastos",dataGasto)}>Seleccionar
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                </div>
                            )}
                            {actividadControl === "Peso"&&(
                            <div>
                                <h3>Pesos Registrados</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Peso promedio</th>
                                        <th>Fecha de medicion</th>
                                        <th>Seleccion</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                    {dataPeso && dataPeso.map((pesoMedio,index)=>(
                                        <tr key={index}>
                                            <td>{pesoMedio.peso_promedio} </td>
                                            <td>{FormatFecha(pesoMedio.fecha_medicion)} </td>
                                            <td>
                                            <button onClick={()=>handleSeleccion(pesoMedio , "Peso",dataPeso)}>
                                            Seleccionar
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            )}
                            {actividadControl === "Lote" &&(
                            <div>
                                <h3>Lote</h3>
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
                                    {dataLote && dataLote.map((lote,index)=>(
                                    <tr key={index}>
                                        <td>{lote.raza}</td>
                                        <td>{lote.cantidad}</td>
                                        <td>{lote.valor_unidad}</td>
                                        <td><button onClick={()=>handleSeleccion(lote , "Lote",dataLote)}>
                                            Seleccionar
                                            </button></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            )}
                            {actividadControl === "Empleado" &&(
                                <div>
                                    <h3>Empleado</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nombre:</th>
                                                <th>Apellido Paterno:</th>
                                                <th>Apellido Materno:</th>
                                                <th>Accion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {asingEmpleado && asingEmpleado.map ((empleado,index)=>(
                                                <tr key={index}>
                                                    <td>{empleado.nombre}</td>
                                                    <td>{empleado.apellido_paterno}</td>
                                                    <td>{empleado.apellido_materno}</td>
                                                    <td><button onClick={()=>handleSeleccion(empleado, "Empleado",asingEmpleado)}>
                                                        Seleccion
                                                        </button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {actividadControl === "Galpon" &&(
                                <div>
                                    <h3>Galpon</h3>
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
                                            {dataGalpon && dataGalpon.map((galpon,index)=>(
                                            <tr key={index}>
                                                <td>{galpon.num_galpon}</td>
                                                <td>{galpon.capacidad}</td>
                                                <td>{galpon.disponible? "si" : "no"}</td>
                                                <td>
                                                    <button onClick={()=>handleSeleccion(galpon, "Galpon",dataGalpon)}>Seleccion</button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default TablaProduccion;