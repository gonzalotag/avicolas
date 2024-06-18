import React, {useEffect,useState} from 'react';
import { getAllProduccion } from '../api/produccion.api';

const ProduccionTabla =({producciones, onEdit,onDelete}) =>{
    // const [producciones,setProducciones]=useState([]);

    // useEffect(()=>{
    //     const fetchData=async()=>{
    //         try {
    //             const data = await getAllProduccion();
    //             setProducciones(data);
    //         } catch (error) {
    //             console.error('error fetchign Producciones', error);
    //         }
    //     }
    //     fetchData();
    // },[])

    return(
        <table>
            <thead>
                <tr>
                    <th>Alimento</th>
                    <th>Galpon</th>
                    <th>Medicina</th>
                    <th>Perfil</th>
                    <th>lote</th>
                    <th>Mortalidad</th>
                    <th>Gasto</th>
                    <th>Peso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {producciones.map((produccion)=>(
                    <tr key={produccion.id}>
                        <td>
                            {produccion.alimento ? (
                                <>
                                    <div>Nombre: {produccion.alimento.nombre}</div>
                                    <div>Precio: {produccion.alimento.precio}$</div>
                                    <div>Cantidad: {produccion.alimento.cantidad} und.</div>
                                    <div>Cantidad sacos: {produccion.alimento.cantidad_sacos} und.</div>
                                    <div>Tipo: {produccion.alimento.tipo}</div>
                                </>):'n/a'}</td>
                        <td>
                            {produccion.galpon ? (
                                <>
                                    <div>Numero Galpon: # {produccion.galpon.num_galpon}</div>
                                    <div>Capacidad: {produccion.galpon.capacidad} und.</div>
                                    <div>Disponible: {produccion.galpon.disponible ?"si":"no"}</div>
                                </>):'n/a'} </td>
                        <td>
                            {produccion.medicina ? (
                                <>
                                    <div>Nombre: {produccion.medicina.nombre}</div>
                                    <div>Via: {produccion.medicina.via}</div>
                                    <div># de Dosis: {produccion.medicina.num_dosis} /dia</div>
                                    <div>Precio: {produccion.medicina.precio} $</div>
                                    <div>Cantidad: {produccion.medicina.cantidad} und.</div>
                                </>):'n/a'}</td>
                        <td>
                            {produccion.perfil ? (
                                <>
                                    <div>Nombre: {produccion.perfil.nombre}</div>
                                    <div>Ap. Paterno: {produccion.perfil.apellido_paterno}</div>
                                    <div>Ap. Materno: {produccion.perfil.apellido_materno}</div>
                                </>):'n/a'}</td>
                        <td>
                            {produccion.lote ? (
                                <>
                                    <div>Raza: {produccion.lote.raza}</div>
                                    <div>Cantidad: {produccion.lote.cantidad} und.</div>
                                    <div>Valor Und.: {produccion.lote.valor_unidad} $</div>
                                </>):'n/a'}</td>
                        <td>
                            {produccion.mortalidad ? (
                                <>
                                    <div>Cantidad: {produccion.mortalidad.cantidad} und.</div>
                                    <div>Causa: {produccion.mortalidad.causa}</div>
                                    <div>Descripcion: {produccion.mortalidad.descripcion}</div>
                                </>):'n/a'}</td>
                        <td>
                            {produccion.gasto ? (
                                <>
                                    <div>Detalle: {produccion.gasto.detalle}</div>
                                    <div>Importe: {produccion.gasto.importe} $</div>
                                </>):'n/a'}</td>
                        <td>{produccion.peso ? (
                                <>
                                    <div>Peso Promedio: {produccion.peso.peso_promedio} kgs.</div>
                                </>):'n/a'}</td>
                        <td>
                            <button onClick={()=>onEdit(produccion)}>Editar</button>
                            <button onClick={()=>onDelete(produccion.id)}>Borrar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProduccionTabla;