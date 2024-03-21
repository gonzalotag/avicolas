import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faIndustry,faPerson,faWarehouse,faFileLines} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";
import TablaPersonal from "./TablaPersonal"
import Almacen from "./Almacen";
import Reportes from "./Reportes.jsx";
import {useNavigate, useLocation } from "react-router-dom"; 
import Produccion from "./Produccion";
import  React,{ useEffect , useState } from 'react';


function MenuAdmin (props){
    const{setEspacioDeTrabajo, perfiles, getPerfilesByRol, getRolesByName}= props;
    const navigate=useNavigate();
    const location = useLocation();

    const [selectedButton , setSelectedButton]= useState(localStorage.getItem('selectedButton')|| 'almacen');

    useEffect(()=>{
        const path = location.pathname;
        if(path.startsWith('/admin/')){
            const button = path.replace('/admin/','')
            setSelectedButton(button);
            localStorage.setItem("selectedButton",button);
        }
    },[location.pathname]);

    const renderEspacioDeTrabajo = (componente,ruta ) =>{
       setEspacioDeTrabajo(componente); 
       navigate(`/admin/${ruta}`);
    }

    return <div className="menuAdminContainer">
        <div className="userContainer">
            <div className="iconoAdmin"><FontAwesomeIcon icon={faCircleUser} className="iconoUser"/> 
            </div>
            <div className="nombreAdmin">
                Administrador

            </div>
        </div>
        <div className="buttonBox">
            <div className={`buttonTarea ${selectedButton === 'almacen' ? 'selected' : '' }`} onClick={()=>{renderEspacioDeTrabajo(<Almacen />, 'almacen')}}>
            <ButtonComponent nombreButton={"Almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>} />
            </div>
            <div className={`buttonTarea ${selectedButton === 'personal' ? 'selected' : '' }`} onClick={()=>{renderEspacioDeTrabajo(<TablaPersonal perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} getRolesByName={getRolesByName}/>,'/personal')}}> 
            <ButtonComponent nombreButton={"Personal"}iconoButton={< FontAwesomeIcon icon={faPerson}/>}/> 
            </div>
            <div className={`buttonTarea ${selectedButton === 'produccion' ? 'selected' : '' }`} onClick={()=>{renderEspacioDeTrabajo(<Produccion />,'/produccion')}}> 
            <ButtonComponent nombreButton={"Produccion"}iconoButton={< FontAwesomeIcon icon={faIndustry}/>}/> 
            </div>
            <div className={`buttonTarea ${selectedButton === 'reportes' ? 'selected' : '' }`} onClick={()=>{renderEspacioDeTrabajo(<Reportes />,'/reportes')}}> 
            <ButtonComponent nombreButton={"Reportes"}iconoButton={< FontAwesomeIcon icon={faFileLines}/>}/> 
            </div>             
        </div>        
    </div>
}

export default MenuAdmin;