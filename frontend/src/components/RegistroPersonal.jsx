import "../assets/css/registroPersonal.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TablaPersonal from "./TablaPersonal";
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";
import { postPerfil } from "../api/perfil.api";
import axios from "axios";


// import TablaPersonal from "./TablaPersonal"
function RegistroPersonal(){
    
    const navigate=useNavigate();
    
        const [formData, setFormData] = useState({
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          direccion:'',
          telefono:'',
          email: '',
          estado: true,
          rol:'',
          contrasenia:'',
        });
        
        const [selectEstado, setSelectEstado]=useState('');
        const [vistaPrevia, setVistaPrevia]=useState(null);
        
        const handleChange = (e) => {
            const { id, value, name } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [id || name]: value,
            }));
          };
        const handleEstadoChange=(estado)=>{
            setSelectEstado(estado);
        }

        const handleVistaPrevia =()=>{
                setVistaPrevia(formData);
                console.log("data previa",formData);
            
        };
        // Restaurar el estado del formulario a valores vacios 
        const handleCancelar = () => {
          setFormData({
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            direccion:'',
            telefono:'',
            email: '',
            estado: '',
            rol:'',
            contrasenia:'',
          });
          setSelectEstado('activo')
          setVistaPrevia(null);
        };
        
        
        // funcion isNumber para poder ingresar numeros en un input q pide solo texto
        function isNumber(evt){
           evt = (evt) ? evt : window.event;
           //cambiar evt = (evt) ? evt : window.event; a uno mas actual
           var charCode = (evt.which) ? evt.which : evt.keyCode;
           if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !==
           46 ) {
             return false;
           }
           return true;
        }
        
        
        const handleSubmit = async (e) => {
          e.preventDefault();
          const dataToAdd = {
            ...formData,
            estado:selectEstado === 'activo',
            rol: formData.rol,
            
        };
        console.log('datos a guardar', dataToAdd)
        
        try{
            const response = await postPerfil(dataToAdd);
                console.log('perfil guardado con exito' , response.data);
                handleCancelar();            
        }catch (error){
            console.error('error al guardar el perfil',error);
        }
    
        };
      
        return (
          <div className="regPersonal">
            <div className="contenedorByT">
            <div className="buttonRegresar">
                <Link to="/personal" >
                        <button> regresar a personal </button>
                </Link>
            </div>    
            <div className="tituloRegistro">Registrar Personal</div>
            </div>
            <form className="formRegistro" onSubmit={handleSubmit}>
              <div className="registroNuevoPers">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingresar Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input
                  type="text"
                  id="apellido_paterno"
                  name="apellidoPat"
                  value={formData.apellido_paterno}
                  onChange={handleChange}
                  placeholder="Apellido Paterno"
                  required
                />
                <br />
                <label htmlFor="apellido_materno">Apellido Materno</label>
                <input
                  type="text"
                  id="apellido_materno"
                  name="apellidoMat"
                  value={formData.apellido_materno}
                  onChange={handleChange}
                  placeholder="Apellido Materno"
                  required
                />
                <br />
                <label htmlFor="direccion">Direccion:</label>
                <input 
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion} 
                onChange={handleChange}
                placeholder="Ingresar Direccion"
                required/>
                <br />
                <label htmlFor="telefono">Telefono:</label>
                <input 
                type="tel" 
                id="telefono"
                name="telefono"
                pattern="[0-9]{7,10}"
                value={formData.telefono} 
                maxLength='10'
                minLength='7'
                onClick = {isNumber}
                // onBlur= {validarTelefono}
                onChange={handleChange}
                placeholder="Ingresar Telefono"
                required/>
                <br />
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Requerido"
                  autoComplete="off"
                  required
                />
                <br />
                <label htmlFor="estado">Estado</label>
                <select 
                id="estado"
                name="estado"
                value={selectEstado}
                onChange={(e)=> handleEstadoChange(e.target.value)} required>
                    <option value="" ></option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
                    <label htmlFor="rol">Rol:</label>
                        <select 
                        title="selectRol"
                        name="rol" 
                        // id=""
                        value={formData.rol}
                        onChange={handleChange}
                        placeholder="seleccionar estado"
                        >    
                        <option value="">seleccion rol</option>
                        <option value="administrador">Administrador</option>
                        <option value="proveedor" >Proveedor</option>
                        <option value="cliente" >Cliente</option>
                        <option value="empleado">Empleado</option>
                        </select>
                    <br />
                    {formData.rol === 'administrador' && (
                    <>
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <input
                    type="password"
                    name="contrasenia"
                    id="contrasenia"
                    value={formData.contrasenia}
                    onChange={handleChange}
                    placeholder={formData.rol === "administrador" ?
                    "ingresa contrasenia" : "" }
                    autoComplete="new-password"
                    />

                    <br />
                    </>
                    )}
                <button type="button" onClick={handleVistaPrevia}> 
                    Vista previa</button>
                <button type="submit" onSubmit={handleSubmit} >
                    Guardar
                </button>
                <button type="button" onClick={handleCancelar}>
                    Cancelar
                </button>
              </div>
              <div className="objetoDatos">
                <h2>datos nuevo registro</h2>
                {vistaPrevia && (
                <ul>
                <li>Nombre: {vistaPrevia.nombre}</li>
                <li>Apellido Paterno: {vistaPrevia.apellido_paterno}</li>
                <li>Apellido Materno: {vistaPrevia.apellido_materno}</li>
                <li>Direccion: {vistaPrevia.direccion}</li>
                <li>Telefono: {vistaPrevia.telefono}</li>
                <li>Email: {vistaPrevia.email}</li>
                <li>Estado: {vistaPrevia.estado}</li>
                <li>Rol: {vistaPrevia.rol}</li>
                {vistaPrevia.rol === 'administrador'&& (
                <li>Contrasenia: {vistaPrevia.contrasenia}</li>
                )}
                </ul>
                )}
            </div>
            </form>
          </div>
        );
}
export default RegistroPersonal;