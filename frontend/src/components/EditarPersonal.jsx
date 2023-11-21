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
            <div className="botonRegresar">
              <Link 
              onClick={(e)=>{e.preventDefault(); 
              navigate("/personal")}}>
                <button> Regresar a Personal </button>
              </Link>
            </div>
            <h1>Edición de personal</h1>
            <div className="editContainer">
            <form className="formEditar" onSubmit={"handleSubmit"}>
              <div className="registroNuevoPers">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingresar Nombre"
                  value={"formData.nombre"}
                  onChange={"handleChange"}
                />
                <br />
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input
                  type="text"
                  id="apellido_paterno"
                  name="apellidoPat"
                  value={"formData.apellido_paterno"}
                  onChange={"handleChange"}
                  placeholder="Apellido Paterno"
                  required
                />
                <br />
                <label htmlFor="apellido_materno">Apellido Materno</label>
                <input
                  type="text"
                  id="apellido_materno"
                  name="apellidoMat"
                  value={"formData.apellido_materno"}
                  onChange={"handleChange"}
                  placeholder="Apellido Materno"
                  required
                />
                <br />
                <label htmlFor="direccion">Direccion:</label>
                <input 
                type="text"
                id="direccion"
                name="direccion"
                value={"formData.direccion"} 
                onChange={"handleChange"}
                placeholder="Ingresar Direccion"
                required/>
                <br />
                <label htmlFor="telefono">Telefono:</label>
                <input 
                type="tel" 
                id="telefono"
                name="telefono"
                pattern="[0-9]{7,10}"
                value={"formData.telefono"} 
                maxLength='10'
                minLength='7'
                onClick = {"isNumber"}
                // onBlur= {validarTelefono}
                onChange={"handleChange"}
                placeholder="Ingresar Telefono"
                required/>
                <br />
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  value={"formData.email"}
                  onChange={"handleChange"}
                  placeholder="Email Requerido"
                  autoComplete="off"
                  required
                />
                <br />
                <label htmlFor="estado">Estado</label>
                <select 
                id="estado"
                name="estado"
                value={"selectEstado"}
                // onChange={(e)=> handleEstadoChange(e.target.value)} 
                required>
                    <option value="" ></option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                <br />
                </select>
                {/* para le select manejar el nombre no por el id */}
                    <label htmlFor="rol">Rol:</label>
                        <select 
                        title="selectRol"
                        name="rol" 
                        // id=""
                        value={"formData.rol"}
                        onChange={"handleChange"}
                        placeholder="seleccionar estado"
                        >    
                        <option value="">seleccion rol</option>
                        <option value="administrador">Administrador</option>
                        <option value="proveedor" >Proveedor</option>
                        <option value="cliente" >Cliente</option>
                        <option value="empleado">Empleado</option>
                        </select>
                    <br />
                <button type="button" onClick={"handleVistaPrevia"}> 
                    Vista previa</button>
                <button type="submit" onSubmit={"handleSubmit"} >
                    Guardar
                </button>
                <button type="button" onClick={"handleCancelar"}>
                    Cancelar
                </button>
                </div>
                </form>
                <div className="tablaEditar" >
                  <table className="editPersonal">
                    <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Nuevo rol </th>
                    </tr>
                  </table>
                </div>
              </div>
    </div>
}
export default EditarPersonal;