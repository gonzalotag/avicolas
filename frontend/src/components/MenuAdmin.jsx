import "../assets/css/menuAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faDollarSign, faShop, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent";

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
            <div className="buttonAdminContainer"><ButtonComponent nombreButton={"Almacen"} iconoButton={<FontAwesomeIcon icon={faWarehouse}/>}/></div>
            <div className="buttonAdminContainer"><ButtonComponent nombreButton={"Compras"} iconoButton={<FontAwesomeIcon icon={faShop}/>}/></div>
            <div className="buttonAdminContainer"> <ButtonComponent nombreButton={"Ventas"} iconoButton={<FontAwesomeIcon icon={faDollarSign}/>}/></div>
            
            
        </div>
    </div>
}

export default MenuAdmin;