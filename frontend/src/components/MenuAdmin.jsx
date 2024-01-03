import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faIndustry,faPerson,faWarehouse,faFileLines} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";
import TablaPersonal from "./TablaPersonal"
import Almacen from "./Almacen";
import Reportes from "./Reportes.jsx";
import {useNavigate } from "react-router-dom"; 
import Produccion from "./Produccion";

function MenuAdmin (props){
    const{setEspacioDeTrabajo, perfiles, getPerfilesByRol, getRolesByName}= props;
    const navigate=useNavigate();

    const renderEspacioDeTrabajo = (componente, ruta) =>{
       setEspacioDeTrabajo(componente); 
       navigate(`/admin/${ruta}`);
    }

    return <div className="menuAdminContainer">
        <div className="userContainer">
            <div className="iconoAdmin"><FontAwesomeIcon icon={faCircleUser} className="iconoUser"/> 
            </div>
            <div className="nombreAdmin">
                nombre
                
            </div>
        </div>
        <div className="buttonBox">
           
            <div className="buttonTarea" onClick={()=>{renderEspacioDeTrabajo(<Almacen />, 'almacen')}}>
            <ButtonComponent nombreButton={"Almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>} />
            </div>
            <div className="buttonTarea" onClick={()=>{renderEspacioDeTrabajo(<TablaPersonal perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} getRolesByName={getRolesByName}/>,'/personal')}}> 
            <ButtonComponent nombreButton={"Personal"}iconoButton={< FontAwesomeIcon icon={faPerson}/>}/> 
            </div>
            <div className="buttonTarea" onClick={()=>{renderEspacioDeTrabajo(<Produccion />,'produccion')}}> 
            <ButtonComponent nombreButton={"Produccion"}iconoButton={< FontAwesomeIcon icon={faIndustry}/>}/> 
            </div>
            <div className="buttonTarea" onClick={()=>{renderEspacioDeTrabajo(<Reportes />,'reportes')}}> 
            <ButtonComponent nombreButton={"Reportes"}iconoButton={< FontAwesomeIcon icon={faFileLines}/>}/> 
            </div>             
        </div>        
    </div>
}

export default MenuAdmin;
