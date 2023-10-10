import { useEffect, useState } from "react";
import "../assets/css/AdminComponent.css"
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";
import { getPerfiles } from "../api/perfil.api";

function AdminComponent(){
    const [espacioDeTrabajo, setEspacioDeTrabajo] = useState(<ContenidoAdmin/>)
    // async function obtenerData (){
    //     await getPerfiles();
    //     return getPerfiles(obtenerData);
    //     } 
    // useEffect(()=>{
    //     console.log(obtenerData())
    // }),[]
    // function handleTablaPersonal (){
    //     return
    //     {mostrarTabla ? <TablaPersonal/> : null}
    // }
    // function handleEspacioDeTrabajoAdmin(){
    //     return
    // }
    return <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin setEspacioDeTrabajo={setEspacioDeTrabajo}/>
        </div>
        <div className="espacioTrabajoAdmin">
            {espacioDeTrabajo}
        </div>
    </div>
}
export default AdminComponent;