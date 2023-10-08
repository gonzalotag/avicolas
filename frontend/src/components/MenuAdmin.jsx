import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser,faWarehouse} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent.jsx";


function MenuAdmin (){
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
            
        </div>
    </div>
}

export default MenuAdmin;