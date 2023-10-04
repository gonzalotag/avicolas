import "../assets/css/AdminComponent.css"
import MenuAdmin from "./MenuAdmin";

function AdminComponent(){
    
    return <div className="espacioAdmin">
        <div className="espacioMenuAdmin">
            <MenuAdmin/>
        </div>
        <div className="espacioTrabajoAdmin">
            espacio de trabajo
        </div>
        
    </div>
}

export default AdminComponent;