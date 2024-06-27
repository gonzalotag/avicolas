import"../assets/css/reportes.css"
import React,{useState,useEffect,useRef} from "react";
import { deleteProduccion, getAllProduccion, patchProduccion} from "../api/produccion.api"
import { patchAlimento } from "../api/alimentos.api";
import { patchGalpon } from "../api/galpones.api";
import { patchGasto } from "../api/gastos.api";
import { patchLote } from "../api/lotes.api";
import { patchMedicina } from "../api/medicinas.api";
import { patchMortalidad } from "../api/mortalidad.api";
import { patchPerfil } from "../api/perfil.api";
import { patchPeso } from "../api/peso.api";
import ProduccionTabla from "./ProduccionTabla";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Reportes (){
    const [produccionData,setProduccionData] = useState([]);
    const [isEditing,setIsEditing] = useState(false);
    const [editData,setEditData]= useState({});
    const [isPrinting, setIsPrinting] = useState(false);
    const reportTableRef = useRef(null);

    useEffect(()=>{
        fetchProduccionData();
    },[]);
    
    const fetchProduccionData = async () =>{
        try {
            const response = await getAllProduccion();
            // console.log("produccion data", response);
            setProduccionData(response);
        } catch (error) {
            console.error("Error al obtener los datos de produccion", error);
        }
    }

    const handleEdit = (data)=>{
        setIsEditing(true);
        setEditData(data);
    }

    const handleDelete = async (id)=>{
        try {
            await deleteProduccion(id);
            fetchProduccionData();
        } catch (error) {
            console.error("error al eliminar produccion",error);
        }
    }

    const handleSave = async (e) =>{
        e.preventDefault();
        console.log('datos a enviar:', editData);
        
        try {
            await patchAlimento(editData.alimento.id,editData.alimento);
            await patchGalpon(editData.galpon.id,editData.galpon);
            await patchGasto(editData.gasto.id,editData.gasto);
            await patchLote(editData.lote.id,editData.lote);
            await patchMedicina(editData.medicina.id,editData.medicina);
            await patchMortalidad(editData.mortalidad.id,editData.mortalidad);
            await patchPerfil(editData.perfil.id,editData.perfil);
            await patchPeso(editData.peso.id,editData.peso);
            
            setIsEditing(false);
            fetchProduccionData();
        } catch (error) {
            console.error("error al actualizar el registro de produccion", error);
            
        }
    }

    const handleCancelar = () =>{
        setIsEditing(false);
        setEditData({});
    }

    const handleChange =(e)=>{
        const {name,value}=e.target;
        const [entity,field]= name.split('.');

        setEditData({
            ...editData,
            [entity]:{
                ...editData[entity],
                [field]:value,
            }
        })
    }

    const handlePrint = async() => {
        try {
            const input = reportTableRef.current;
            if (!input) {
                console.error("elemento con referencia reportTablaRef no encontrado");
                return
            }

            const actionsColumn = input.querySelectorAll('th:last-child, td:last-child');
            actionsColumn.forEach((column) => {
                column.style.display = 'none';
            });
            
            
            const canvas = await html2canvas(input, {
                scale:2,
                useCORS: true,
            })
            const imgData = canvas.toDataURL("img/png");
            const pdf = new jsPDF ('','','');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height* pdfWidth)/canvas.width;

            pdf.setFontSize(18);
            pdf.text('Reporte Produccion', pdfWidth/2,20, {align:'center'});
            pdf.add

            const margin = 20;
            const startY = 40;
            pdf.addImage(imgData, "PNG",margin, startY, pdfWidth-margin *2, pdfHeight);
            pdf.save('reporte_Produccion.pdf');
        } catch (error) {
            console.error("error generating pdf ", error);
        }
    }
    return (
        <div className="reportesContainer">
           <h2>Reportes Produccion</h2>
        {isEditing &&(
            <form onSubmit={handleSave}>
                <div>
                    <h3>Alimento</h3>
                    <label> Nombre Alimento:
                        <input type="text" name="alimento.nombre" value={editData.alimento?.nombre} onChange={handleChange} />
                    </label>
                    <label> Precio:
                        <input type="number"  name="alimento.precio" value={editData.alimento?.precio} onChange={handleChange} />
                    </label>
                    <label> Cantidad:
                        <input type="number"  name="alimento.cantidad" value={editData.alimento?.cantidad} onChange={handleChange} />
                    </label>
                    <label> Cantidad Sacos:
                        <input type="number"  name="alimento.cantidad_sacos" value={editData.alimento?.cantidad_sacos}onChange={handleChange} />
                    </label>
                    <label> Tipo:
                        <select name="alimento.tipo" 
                            value={editData.alimento?.tipo}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar</option>
                            <option value="inicial">Inicial</option>
                            <option value="crecimiento">Crecimiento</option>
                            <option value="final">Final</option>
                        </select>
                    </label>
                    <h3>Galpon</h3>
                    <label> Numero Galpon:
                        <input type="number"  name="galpon.num_galpon" value={editData.galpon?.num_galpon} onChange={handleChange} />
                    </label>
                    <label> Capacidad:
                        <input type="number" name="galpon.capacidad" value={editData.galpon?.capacidad} onChange={handleChange} />
                    </label>
                    <label> Disponible:
                        <select name="galpon.disponible" 
                            value={editData.galpon?.disponible}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </label>
                    <h3>Medicinas</h3>
                    <label> Nombre Medicina:
                        <input type="text" name="medicina.nombre" value={editData.medicina?.nombre} onChange={handleChange} />
                    </label>
                    <label> Via:
                        <input type="text" name="medicina.via" value={editData.medicina?.via} onChange={handleChange} />
                    </label>
                    <label> # de Dosis:
                        <input type="Number" name="medicina.num_dosis" value={editData.medicina?.num_dosis} onChange={handleChange} />
                    </label>
                    <label> Precio:
                        <input type="numbre" name="medicina.precio" value={editData.medicina?.precio} onChange={handleChange} />
                    </label>
                    <label> Cantidad:
                        <input type="number" name="medicina.cantidad" value={editData.medicina?.cantidad} onChange={handleChange} />
                    </label>
                    <h3>Perfil</h3>
                    <label> Nombre:
                        <input type="text" name="perfil.nombre" value={editData.perfil?.nombre} onChange={handleChange} />
                    </label>
                    <label> Ap. Paterno:
                        <input type="text" name="perfil.apellido_paterno" value={editData.perfil?.apellido_paterno} onChange={handleChange} />
                    </label>
                    <label> Ap. Materno:
                        <input type="text" name="perfil.apellido_materno" value={editData.perfil?.apellido_materno} onChange={handleChange} />
                    </label>
                    <h3>Lote</h3>
                    <label> Raza:
                        <select name="lote.raza" 
                            value={editData.lote?.raza}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar</option>
                            <option value="plymouth rock">plymouth rock</option>
                            <option value="cornish">cornish</option>
                            <option value="sussex clara">sussex clara</option>
                            <option value="new hampshire">new hampshire</option>
                        </select>
                    </label>
                    <label> Cantidad:
                        <input type="number" name="lote.cantidad" value={editData.lote?.cantidad} onChange={handleChange} />
                    </label>
                    <label> Valor Unidad:
                        <input type="number" name="lote.valor_unidad" value={editData.lote?.valor_unidad} onChange={handleChange} />
                    </label>
                    <h3>Mortalidad</h3>
                    <label> Cantidad:
                        <input type="number" name="mortalidad.cantidad" value={editData.mortalidad?.cantidad} onChange={handleChange} />
                    </label>
                    <label> Causa:
                        <select name="mortalidad.causa" 
                            value={editData.mortalidad?.causa}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar</option>
                            <option value="natural">Natural</option>
                            <option value="enfermedad">Enfermedad</option>
                            <option value="accidente">Accidente</option>
                            <option value="parasitos">Parasitos</option>
                            <option value="mala alimentacion">Mala alimentacion</option>
                            <option value="ataque de depredadores">Ataque de depredadores</option>
                        </select>
                    </label>
                    <label> Descripcion:
                        <textarea name="mortalidad.descripcion" value={editData.mortalidad?.descripcion} onChange={handleChange} ></textarea>
                    </label>
                    <h3>Gastos</h3>
                    <label> Detalle:
                        <input type="text" name="gasto.detalle" value={editData.gasto?.detalle} onChange={handleChange} />
                    </label>
                    <label> Importe:
                        <input type="number" name="gasto.importe" value={editData.gasto?.importe} onChange={handleChange} />
                    </label>
                    <h3>Peso</h3>
                    <label> Peso Promedio:
                        <input type="number" name="peso.peso_promedio" value={editData.peso?.peso_promedio} onChange={handleChange} />
                    </label>
                </div>
                <br />
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
            </form>
        )}
        <div ref={reportTableRef}>
            <ProduccionTabla
            producciones={produccionData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
        </div>
        <button onClick={handlePrint}>Guardar como PDF</button>
        </div>
    )
}
export default Reportes;