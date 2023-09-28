import "../assets/css/administradorPage.css"
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import MenuAdmin from "../components/MenuAdmin";

function AdministradorPage (){
    return <div className="adminPageContainer">
        {/* <Navbar/> */}

        <div className="espacioDisponible">
        <div className="espacioMenuAdmin">
        <MenuAdmin/>
        </div>
        {/* <div className="espacioDeTrabajo">
                espacio de trabajo
        </div> */}
        </div>
        
        {/* <Footer/> */}
    </div>
}

export default AdministradorPage;