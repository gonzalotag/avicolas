
import React, { useState,useEffect } from "react";
import { getAlimentosById } from "../api/alimentos.api";
import { getGalpon} from "../api/galpones.api";
import { getMedicina } from "../api/medicinas.api";
import { getPerfilesById} from "../api/perfil.api";
import { getLote} from "../api/lotes.api";
import { getMortalidad } from "../api/mortalidad.api";
import { getGasto} from "../api/gastos.api";
import { getPesoById } from "../api/peso.api";

function RenderSubtablas ({data}) {

    const[alimentos,setAlimentos]=useState([]);
    const[galpones,setGalpones]=useState([]);
    const[medicinas,setMedicinas]=useState([]);
    const[perfiles,setPerfiles]=useState([]);
    const[lotes,setLotes]=useState([]);
    const[mortalidades,setMortalidades]=useState([]);
    const[gastos,setGastos]=useState([]);
    const[pesos,setPesos]=useState([]);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const alimentosData = await getAlimentosById(data.map(item =>item.id_alimento));
                console.log('alimentos data', alimentosData);
                setAlimentos(alimentosData);
            } catch (error) {
                console.error('error al obtener alimento', error);
                setAlimentos([]);
            }

            try {
                const galponesData = await getGalpon(data.map(item =>item.id_galpon));
                setGalpones(galponesData);
            } catch (error) {
                console.error('error al obtener galpon', error);
                setGalpones([]);
            }
                const lotesData = await getLote(data.map(item =>item.id_medicina));
                setLotes(lotesData);
                const mortalidadData = await getMortalidad(data.map(item =>item.id_mortalidad));
                setMortalidades(mortalidadData);
                const gastosData=await getGasto(data.map(item =>item.id_gasto));
                setGastos(gastosData);
                const pesoData=await getPesoById(data.map(item => item.id_peso));
                setPesos(pesoData);
            
            try {
                const medicinasData = await getMedicina(data.map(item =>item.id_medicina));
                setMedicinas(medicinasData);
            } catch (error) {
                console.error('error al pobtener medicinas', error);
            }
        }
        fetchData();
    },[data]);


    const renderAlimento = (item) =>{
        if(!alimentos || !Array.isArray(alimentos)){
            return <span>n/a</span>
        }
        const alimento= alimentos.find(alimento =>alimento.id === item.id_alimento);
        console.log('render Alimentos', alimento);
        if (!alimento) {
            return <span>n/a</span>
        }
        return(
            <span>
            {alimento.nombre}
            {alimento.cantidad}
            {alimento.tipo}
            {alimento.cantidad_sacos}
            </span>
        )
    }

    const renderGalpon = (item) =>{
        
        if (!galpones || !Array.isArray(galpones)) {
            return <span>n/a</span>;
        }
        const galpon = galpones.find(galpon => galpon.id === item.id_galpon);
        if (!galpon) {
            return <span>n/a</span>
        }
        return(
            <span>
                {galpon.num_galpon}
                {galpon.capacidad}
                {galpon.disponible ? "si":"no"}
            </span>
        )
    }
    
    
    const renderMedicina = (item) =>{
        if (!item) {
            return <span>N/A</span>
        }
        const medicinaId =item.id_medicina;
        // let medicina= [];
        const medicina = getMedicina(medicinaId);
        if (!medicina) {
            return <span>N/A</span>
        }
        return(
            <span>
            {medicina.nombre}
            {medicina.via}
            {medicina.num_dosis}
            {medicina.precio}
            {medicina.cantidad}
            </span>
        )
    }

    const renderPerfil = ({perfil}) =>{
        if (!perfil) {
            return <td colSpan={3}>N/A</td>
        }
        return(
            <>
            <td>{perfil.nombre}</td>
            <td>{perfil.apellido_paterno}</td>
            <td>{perfil.apellido_materno}</td>
            </>
        )
    }

    const renderLote = (item) =>{
        if (!item) {
            return <span>N/A</span>
        }
        const loteId=item.lote;
        const lote =getLote(loteId)
        if (!lote) {
            return <span>N/A</span>
        }
        return(
            <span>
            {lote.raza}
            {lote.cantidad}
            {lote.valor_unidad}
            </span>
        )
    }

    const renderMortalidad = (item) =>{
        if (!item) {
            return <span>N/A</span>
        }
        const mortalidadId= item.mortalidad;
        const mortalidad =getMortalidad(mortalidadId);
        if (!mortalidad) {
            return <span>N/A</span>
        }
        return(
            <span>
            {mortalidad.cantidad}
            {mortalidad.causa}
            {mortalidad.descripcion}
            </span>
        )
    }

    const renderGasto = (item) =>{
        if (!item|| !item.id_gasto) {
            return <span>N/A</span>
        }
        const gastoId=item.gasto;
        const gasto = getGasto(gastoId);
        if (!gasto) {
            return <span>N/A</span>
        }
        return(
            <span>
            {gasto.detalle}
            {gasto.importe}
            </span>
        )
    }

    const renderPeso = (item) =>{
        if (!item) {
            return <span>N/A</span>
        }
        const pesoId=item.peso;
        const peso = getPesoById(pesoId);
        if (!peso) {
            return <span>N/A</span>
        }
        return(
            <span>
            <td>{peso.peso_promedio}</td>
            </span>
        )
    }
    
    return (
        <>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{renderAlimento(item)}</td>
                    <td>{renderGalpon(item)}</td>
                    <td>{renderMedicinas(item)}</td>
                    <td>{renderLote(item)}</td>
                    <td>{renderMortalidad(item)}</td>
                    <td>{renderGasto(item)}</td>
                    <td>{renderPeso(item)}</td> 
                </tr>
            ))}
        </>
    )
                    
    
    
}
export default RenderSubtablas;