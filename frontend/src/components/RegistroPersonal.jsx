import "../assets/css/registroPersonal.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TablaPersonal from "./TablaPersonal";
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";
import AdminComponent from "./AdminComponent";
import Almacen from "./Almacen";

// import TablaPersonal from "./TablaPersonal"
function RegistroPersonal(props){
    const{espacioDeTrabajo,setEspacioDeTrabajo}=props;
    const{espacioRegistro,setEspacioRegistro, }= useState(<ContenidoAdmin/>)
    const navigate=useNavigate();
    // const {deletePersona,}= props;
    return <div className="regPersonal"> 
            registros
            <Link to="/personal" onClick={(e)=>{e.preventDefault(); navigate("/personal")}}>
                        <button> regresar a personal </button>
            </Link>
            <div className="editarTabla">
            {/* <form action="" onSubmit={"handleSubmit"}> */}
            <form action="">
            <label htmlFor="">Nombre:</label>
            <input type="text" />
            <br />                    
            <label htmlFor="">apellido Paterno</label>
					<input type="text" name = "apellido paterno" 
                    // onChange={(e)=>setApellidoPat(e.target.value)}
                    required/>
                    <br />
                    <label htmlFor="apellidoMat"> Apellido Materno:</label>
                    <input type="text"
                    // onChange={(e)=>setApellidoMat(e.target.value)}
                    required/>
                    <br />
                    <label htmlFor="direccion">Direccion:</label>
                    <input type="text"
                    // onChange={(e)=>setDrireccion(e.target.value)}
                    required/>
                    <br />
                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="tel"  
                    // onChange={(e)=>setTelefono(e.target.value)}
                    required/>
                    <br />
                    <label htmlFor="email">Correo Electronico:</label>
                    <input type="email" 
                    // onChange={(e)=>setEmail(e.target.value)}
                    required/>
                    <br />     
            <button type="submit">Guardar</button>
            {/* </form> */}
            </form>
            </div>
            {/* <div className="espacioRegistro">
            {espacioRegistro}
            </div> */}
        {/* <div>
        <TablaPersonal setEspacioDeTrabajo = {setEspacioDeTrabajo}/>
        </div> */}
        {/* <div className="espacioSinRegistrar">
            {espacioDeTrabajo}
        </div> */}
        </div>
    
}
export default RegistroPersonal;