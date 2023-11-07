import"../assets/css/editarPersonal.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import TablaPersonal from "./TablaPersonal";
import { useState } from "react";
import { getPerfil,getPerfilesByRol } from "../api/perfil.api";

function EditarPersonal (dato, ){
    
    const navigate=useNavigate();
    const {nombre,setNombre}=useState(dato.nombre);
    const handleSave=()=>{
        const datosUpdate = {
            ...dato,
            nombre:nombre,
            rol:rol
        };

       
    };

    
    return<div className="editarEspacio">
            <Link 
            
            onClick={(e)=>{e.preventDefault(); 
            navigate("/personal")}}>
                <button> regresar </button>
            </Link>
            editar por filas
            <div className="personalAEditar">
                <input 
                type="text" 
                placeholder="nombre"
                // value={nombre}
                // onChange={{(e)=>setNombre(e.target.value)}}
                />
                <input type="text" placeholder="rol" />
            <button onClick={dato}>guardar</button>
            <button onClick={dato}>cancelar</button>
            </div>
    </div>
}
export default EditarPersonal;