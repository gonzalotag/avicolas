import { useEffect, useState } from "react";
import "../assets/css/AdminComponent.css"
// import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";
import { getPerfiles, getPerfilesByRol } from "../api/perfil.api";
import {getAllRoles} from "../api/rol.api";
import { Route, Routes, useNavigate} from "react-router-dom";
import Produccion from "./Produccion";
import TablaPersonal from "./TablaPersonal";
import Almacen from "./Almacen";
import Reportes from "./Reportes";

function AdminComponent(){
    const [perfiles, setPerfiles] = useState([]);
    const [roles, setRoles] = useState([]);
    // const [espacioDeTrabajo, setEspacioDeTrabajo] = useState (<ContenidoAdmin/>)/
    const [selectedButton, setSelectedButton ]=useState(null);
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
    
    const handleEspacioDeTrabajoChange = (buttonName)=>{
        setSelectedButton(buttonName);
        navigate(buttonName, {replace:true});
    }
    
    // const renderContenido =() =>{
    //     console.log('boton seleccionado', selectedButton);
    //     switch(selectedButton){
    //         case '/admin/almacen':
    //             return <Almacen/>
    //         case '/admin/personal':
    //             return <TablaPersonal perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} getRolesByName={getRolesByName}/>
    //         case '/admin/produccion':
    //             return <Produccion/>
    //         case '/admin/reportes':
    //             return <Reportes/>
    //         default:
    //             return null;
    //     }
    // }

    return (
    <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin 
            perfiles={perfiles}
            getPerfilesByRol={getPerfilesByRol} 
            roles={roles} 
            getRolesByName={getRolesByName} 
            onEspacioDeTrabajoChange={handleEspacioDeTrabajoChange}
            />
        </div>
        <div className="espacioTrabajoAdmin">
            {/* es el espacio sobre el cual se mostrara todo el proyecto */}
            {/* {renderContenido()} */}
            <Routes>
                <Route path='/almacen' element={<Almacen/>}/>
                <Route path='/personal' element={<TablaPersonal/>}/>
                <Route path='/produccion' element={<Produccion/>}/>
                <Route path='/reportes' element={<Reportes/>}/>
            </Routes>
        </div>
    </div>
    );
}
export default AdminComponent;

