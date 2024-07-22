import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faIndustry,faPerson,faWarehouse,faFileLines} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";
import {useNavigate, useLocation } from "react-router-dom"; 
import { useEffect , useState } from 'react';

function MenuAdmin (props){
    const{onEspacioDeTrabajoChange, perfiles, getPerfilesByRol, getRolesByName}= props;
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialSelectedButton = (pathname)=>{
        if (pathname.startsWith('/admin/')) {
            return pathname.slice('/admin/'.length);
        }
        return 'almacen';
    }

    const [selectedButton , setSelectedButton]= useState(getInitialSelectedButton(location.pathname));

    useEffect(()=>{
        const path = location.pathname;
        const buttonName = getInitialSelectedButton(path);
        setSelectedButton(buttonName);
    },[location.pathname]);

    const handlePageNavigation = (ruta) =>{
        navigate(ruta,{replace: true});
    }

    const handleButtonClick = (buttonName) =>{
        setSelectedButton(buttonName);
        onEspacioDeTrabajoChange(buttonName);
        handlePageNavigation(`/admin${buttonName}`);
    }

    return (
        <div className="menuAdminContainer">
        <div className="userContainer">
            <div className="iconoAdmin"><FontAwesomeIcon icon={faCircleUser} className="iconoUser"/> </div>
            <div className="nombreAdmin">Administrador</div>
        </div>
        <div className="buttonBox">
            <div className={`buttonTarea ${selectedButton === 'almacen' ? 'active':''}`}  onClick={()=>{handleButtonClick('/almacen ')}}>
            <ButtonComponent nombreButton={"Almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>} isSelected={selectedButton ==='almacen'}/>
            </div>
            <div className={`buttonTarea ${selectedButton === 'personal' ? 'active':''}`}  onClick={()=>{handleButtonClick('/personal')}}> 
            <ButtonComponent nombreButton={"Personal"}iconoButton={< FontAwesomeIcon icon={faPerson}/>} isSelected={selectedButton ==='personal'}/> 
            </div>
            <div className={`buttonTarea ${selectedButton === 'produccion' ? 'active':''}`}  onClick={()=>{handleButtonClick('/produccion')}}> 
            <ButtonComponent nombreButton={"Produccion"}iconoButton={< FontAwesomeIcon icon={faIndustry}/>} isSelected={selectedButton ==='produccion'}/> 
            </div>
            <div className={`buttonTarea ${selectedButton === 'reportes' ? 'active':''}`}  onClick={()=>{handleButtonClick('/reportes')}}> 
            <ButtonComponent nombreButton={"Reportes"}iconoButton={< FontAwesomeIcon icon={faFileLines}/>} isSelected={selectedButton ==='reportes'}/> 
            </div>    
        </div>        
    </div>
    );
}

export default MenuAdmin;