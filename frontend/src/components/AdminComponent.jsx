import { useEffect, useState } from "react";
import "../assets/css/AdminComponent.css"
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";
import { getPerfiles, getPerfilesByRol } from "../api/perfil.api";
import {getAllRoles} from "../api/rol.api";
import { useNavigate} from "react-router-dom";

function AdminComponent(){
    const [perfiles, setPerfiles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [espacioDeTrabajo, setEspacioDeTrabajo] = useState (<ContenidoAdmin/>)
    const navigate= useNavigate();

    useEffect(()=>{
        getPerfilesTotal(),
        getRolesByName()
    },[])

    async function getPerfilesTotal(){
        setPerfiles(await getPerfiles())
    }

    async function getRolesByName (){
        setRoles(await getAllRoles())
    }
    
    const renderEspacioDeTrabajo = (componente)=>{
        setEspacioDeTrabajo(componente);
    }
    
    return (
    <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin 
            setEspacioDeTrabajo={renderEspacioDeTrabajo} 
            perfiles={perfiles}
            getPerfilesByRol={getPerfilesByRol} 
            roles={roles} 
            getRolesByName={getRolesByName} 
            />
        </div>
        <div className="espacioTrabajoAdmin">
            {/* es el espacio sobre el cual se mostrara todo el proyecto */}
            {espacioDeTrabajo}
        </div>
    </div>
    
    );
}
export default AdminComponent;

