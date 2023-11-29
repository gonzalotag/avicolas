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
//las funciones asincronas siempre van de la mano con un await esperando
//respuesta desde la parte externa que este afuera del frontend puede ser una BD
//o hasta el mismo backend todo lo que es un sistema externo
    async function getPerfilesTotal(){
        setPerfiles(await getPerfiles())
        console.log( await getPerfiles());
    }

    async function getRolesByName (){
        setRoles(await getAllRoles())
        console.log(roles)
    }
    const [espacioDeTrabajo, setEspacioDeTrabajo] = useState(<ContenidoAdmin/>)
    
    return <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin setEspacioDeTrabajo={setEspacioDeTrabajo} 
            perfiles={perfiles}
            getPerfilesByRol={getPerfilesByRol} 
            roles={roles} getRolesByName={getRolesByName} />
        </div>
        <div className="espacioTrabajoAdmin">
            {espacioDeTrabajo}
        </div>
    </div>
}
export default AdminComponent;

