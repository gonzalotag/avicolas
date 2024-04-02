import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faIndustry,faPerson,faWarehouse,faFileLines} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";
import {Routes, Route, useNavigate, useLocation } from "react-router-dom"; 
import { useEffect , useState } from 'react';
// import Almacen from "./Almacen";
// import Reportes from "./Reportes.jsx";
// import Produccion from "./Produccion";
// import TablaPersonal from "./TablaPersonal"
// import ContenidoAdmin from "./ContenidoAdmin.jsx";


function MenuAdmin (props){
    const{onEspacioDeTrabajoChange, perfiles, getPerfilesByRol, getRolesByName}= props;
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialSelectedButton = (pathname)=>{
        if (pathname.startsWith('/admin/')) {
            // return pathname.replace('/admin/','');
            return pathname.slice('/admin/'.length);
        }
        return 'almacen';
    }

    const [selectedButton , setSelectedButton]= useState(getInitialSelectedButton(location.pathname));

    useEffect(()=>{
        const path = location.pathname;
        const buttonName = getInitialSelectedButton(path);
        // if(path.startsWith('/admin/')){
        //     const button = path.replace('/admin/','')
        //     localStorage.setItem("selectedButton", button);
        // }
        setSelectedButton(buttonName);
        // navigate(`/admin/${buttonName}`,{replace: true});
        // console.log("selectedButton", selectedButton);
    },[location.pathname]);

    const handlePageNavigation = (ruta) =>{
        navigate(ruta,{replace: true});
    }

    const handleButtonClick = (buttonName) =>{
        // console.log('boton clickeado', buttonName);
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
            <div className='buttonTarea'  onClick={()=>{handleButtonClick('/almacen')}}>
            <ButtonComponent nombreButton={"Almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>} />
            </div>
            <div className='buttonTarea'  onClick={()=>{handleButtonClick('/personal')}}> 
            <ButtonComponent nombreButton={"Personal"}iconoButton={< FontAwesomeIcon icon={faPerson}/>}/> 
            </div>
            <div className='buttonTarea'  onClick={()=>{handleButtonClick('/produccion')}}> 
            <ButtonComponent nombreButton={"Produccion"}iconoButton={< FontAwesomeIcon icon={faIndustry}/>}/> 
            </div>
            <div className='buttonTarea'  onClick={()=>{handleButtonClick('/reportes')}}> 
            <ButtonComponent nombreButton={"Reportes"}iconoButton={< FontAwesomeIcon icon={faFileLines}/>}/> 
            </div>    
            {/* <ContenidoAdmin selectedButton={selectedButton}/> */}
        </div>        
    </div>
    );
}

export default MenuAdmin;