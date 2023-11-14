import "../assets/css/menuAdmin.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faIndustry,faPerson,faWarehouse,faFileLines} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";
import TablaPersonal from "./TablaPersonal";
import Suministros from "./Produccion";
import Almacen from "./Almacen";
import Reportes from "./Reportes.jsx";




function MenuAdmin (props){
    const{setEspacioDeTrabajo, perfiles, getPerfilesByRol, getRolesByName}= props;

    
   
    return <div className="menuAdminContainer">
        <div className="userContainer">
            <div className="iconoAdmin"><FontAwesomeIcon icon={faCircleUser} className="iconoUser"/> 
            </div>
            <div className="nombreAdmin">
                nombre
            </div>
        </div>
        <div className="buttonBox">
            <div className="buttonTarea" onClick={()=>{setEspacioDeTrabajo(<Almacen />)}}>
            <ButtonComponent nombreButton={"Almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>} />
            </div>
            
            <div className="buttonTarea" onClick={()=>{setEspacioDeTrabajo(<TablaPersonal perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} getRolesByName={getRolesByName} />)}} > 
            <ButtonComponent nombreButton={"Personal"}iconoButton={< FontAwesomeIcon icon={faPerson}/>}/> 
            </div>
            
            <div className="buttonTarea" onClick={()=>{setEspacioDeTrabajo(<Suministros perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} getRolesByName={getRolesByName} />)}} > 
            <ButtonComponent nombreButton={"Produccion"}iconoButton={< FontAwesomeIcon icon={faIndustry}/>}/> 
            </div>
            <div className="buttonTarea" onClick={()=>{setEspacioDeTrabajo(<Reportes perfiles={perfiles} getPerfilesByRol={getPerfilesByRol} getRolesByName={getRolesByName} />)}} > 
            <ButtonComponent nombreButton={"Reportes"}iconoButton={< FontAwesomeIcon icon={faFileLines}/>}/> 
            </div> 
            
        </div>
        
    </div>
}

export default MenuAdmin;
