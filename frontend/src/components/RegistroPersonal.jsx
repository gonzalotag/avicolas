import "../assets/css/registroPersonal.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TablaPersonal from "./TablaPersonal";
import ContenidoAdmin from "./ContenidoAdmin";
import MenuAdmin from "./MenuAdmin";


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
        //   estado: '',
          contrasenia:'',
        });
      
        const [datosMostrados, setDatosMostrados] = useState([]);
        const [selectEstado,setSelectEstado]=useState('inactivo')
      
        const handleChange = (e) => {
            const { id, value, name} = e.target;
            // const newValue = type === 'radio' ? (checked ? value : '') : value;
            setFormData({
              ...formData,
              [id || name]: value,
              estado: selectEstado,
            });
        };
        const handleEstadoChange=(estado)=>{
            setSelectEstado(estado);
        }
        const handleCancelar = () => {
          // Restaurar el estado del formulario
          setFormData({
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            direccion:'',
            telefono:'',
            email: '',
            // estado: '',
            contrasenia:'',
          });
        };
        //funcion para controlar numeros de 
        // function validarTelefono(phoneNum){
        //     var regex=/^[0-9]{10}$/; 
        //    return regex.test(phoneNum);
        //  }
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
         
        
        const handleSubmit = (e) => {
          e.preventDefault();
          const dataToAdd = {
            ...formData,
            estado:selectEstado,

          };
          // Almacenar los datos en el estado de datos mostrados
          setDatosMostrados([...datosMostrados, dataToAdd]);
      
          // Restaurar el estado del formulario
          handleCancelar();
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
                required/>
                <br />
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <br />
                <label htmlFor="estado">Estado</label>
                <select 
                id="estado"
                name="estado"
                value={selectEstado}
                onChange={(e)=> handleEstadoChange(e.target.value)} required>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
                    {/* <label htmlFor="activo">
                      Activo
                      <input
                        type="radio"
                        name="estado"
                        id="activo"
                        value="activo"
                        onChange={()=>handleEstadoChange('activo')}
                        checked={selectEstado === 'activo'}
                        required
                      />
                    </label>
                    <label htmlFor="inactivo">
                      Inactivo
                      <input
                        type="radio"
                        name="estado"
                        id="inactivo"
                        value="inactivo"
                        onChange={()=>handleEstadoChange('inactivo')}
                        checked={selectEstado ==='inactivo'}
                        required
                      />
                    </label> */}
                    <label htmlFor="rol">Rol:</label>
                        {/* <select name="" id="rolSelect">
                            {roles && roles.map(role => (
                                <option key={role._id}>{role.name}</option>
                            ))}
                          </select> */}
                            <select name="" id="">
                            <option value=""></option>
                            <option value="administrador">Administrador</option>
                            <option value="proveedor" >Proveedor</option>
                            <option value="cliente" >Cliente</option>
                            <option value="empleado">Empleado</option>
                            </select>
                    <br />
                    <label htmlFor="contrasenia">Contrasenia:</label>
                    <input 
                    type="contrasenia"
                    name="contrasenia"
                    id="contrasenia" 
                    value={formData.contrasenia}
                    onChange={handleChange}
                    
                    />
                    <br />  
                <button type="submit" onSubmit={handleSubmit} >
                    Guardar
                </button>
                <button type="button" onClick={handleCancelar}>
                  Cancelar
                </button>
              </div>
              <div className="objetoDatos">
                <ul>
                <li>Nombre: {formData.nombre}</li>
                {/* <li>Apellido Paterno: {formData.apellidoPat}</li> */}
                <li>Apellido Paterno: {formData.apellido_paterno}</li>
                {/* <li>Apellido Materno: {formData.apellidoMat}</li> */}
                <li>Apellido Materno: {formData.apellido_materno}</li>
                <li>Direccion: {formData.direccion}</li>
                <li>Telefono: {formData.telefono}</li>
                <li>Email: {formData.email}</li>
                <li>Estado: {formData.estado}</li>
                <li>Rol: {formData.rol}</li>
                <li>Contrasenia: {formData.contrasenia}</li>
                </ul>
            </div>
            </form>
      
            {datosMostrados.length > 0 && (
              <div className="tablaPreReg">
                <h3>Datos del formulario</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido Paterno</th>
                      <th>Apellido Materno</th>
                      <th>Direccion</th>
                      <th>Telefono</th>
                      <th>Correo Electrónico</th>
                      <th>Estado</th>
                      <th>Rol</th>
                      <th>Contrasenia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMostrados.map((dato, index) => (
                      <tr key={index}>
                        <td>{dato.nombre}</td>
                        <td>{dato.apellido_paterno}</td>
                        <td>{dato.apellido_materno}</td>
                        <td>{dato.direccion}</td>
                        <td>{dato.telefono}</td>
                        <td>{dato.email}</td>
                        <td>{dato.estado}</td>
                        <td>{dato.rol}</td>
                        <td>{dato.contrasenia}</td>
                      </tr>
                      
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
    
        
}
export default RegistroPersonal;