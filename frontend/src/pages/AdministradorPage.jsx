import "../assets/css/administradorPage.css"
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import MenuAdmin from "../components/MenuAdmin";

function AdministradorPage (){
    return <div className="adminPageContainer">
        <div className="espacioDisponible">
            <div className="barraMenuAdmin">
            <MenuAdmin/>
            </div>
        
        <div className="espacioDeTrabajo">
                espacio de trabajo
        </div>
        </div>
        
        
        
        
    </div>
}

export default AdministradorPage;