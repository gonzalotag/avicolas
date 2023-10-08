import "../assets/css/AdminComponent.css"
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";

function AdminComponent(){
    
    return <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin/>
        </div>
        <div className="espacioTrabajoAdmin">
            <ContenidoAdmin/>
        </div>
        
    </div>
}
export default AdminComponent;