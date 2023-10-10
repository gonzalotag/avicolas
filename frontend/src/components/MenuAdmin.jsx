import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faPerson,faWarehouse} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";
import { useState } from "react";
import TablaPersonal from "./TablaPersonal";


function MenuAdmin (props){
    
    const{setEspacioDeTrabajo}= props;

    function changeMostrarTablaState (){
        setMostrarTabla(!mostrarTabla)
        console.log(mostrarTabla);
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
            
            <div className="buttonTarea"><ButtonComponent nombreButton={"almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>} /></div>
            <div onClick={()=>{setEspacioDeTrabajo(<TablaPersonal/>)}} className="buttonTarea"> <ButtonComponent nombreButton={"personal"}iconoButton={< FontAwesomeIcon icon={faPerson}/>}/> </div>
            
        </div>
    </div>
}

export default MenuAdmin;
