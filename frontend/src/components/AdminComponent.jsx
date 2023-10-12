import { useEffect, useState } from "react";
import "../assets/css/AdminComponent.css"
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";
import { getPerfiles, getPerfilesByRol } from "../api/perfil.api";
import {getRolRequest,getAllRoles} from "../api/rol.api";

function AdminComponent(){
    const [perfiles, setPerfiles] = useState([]);
    const [roles, setRoles] = useState([]);
    useEffect(()=>{
        getPerfilesTotal(),
        getRolesByName()
    },[])

    async function getPerfilesTotal(){
        setPerfiles(await getPerfiles())
        console.log( await getPerfiles());
    }

    async function getRolesByName (){
        setRoles(await getAllRoles())
        console.log(roles)
    }
    const [espacioDeTrabajo, setEspacioDeTrabajo] = useState(<ContenidoAdmin/>)
    
    //borrar los gets q no se estan utilizando y revisar de nuevo las funcionalidades 
    //revisar context
    return <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin setEspacioDeTrabajo={setEspacioDeTrabajo} perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} roles={roles} getRolesByName={getRolesByName} />
        </div>
        <div className="espacioTrabajoAdmin">
            {espacioDeTrabajo}
        </div>
    </div>
}
export default AdminComponent;

// function handleTablaPersonal (){
    //     return
    //     {mostrarTabla ? <TablaPersonal/> : null}
    // }
    // function handleEspacioDeTrabajoAdmin(){
    //     return
    // }