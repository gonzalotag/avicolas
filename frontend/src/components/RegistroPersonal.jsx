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
          email: '',
          estado: 'activo',
        //   estado2: 'activo',
        });
      
        const [datosMostrados, setDatosMostrados] = useState([]);
      
        const handleChange = (e) => {
          const { id, value, name, type, checked } = e.target;
          const newValue = type === 'radio' ? (checked ? value : '') : value;
          setFormData({
            ...formData,
            [id || name]: newValue,
          });
        };
      
        const handleCancelar = () => {
          // Restaurar el estado del formulario
          setFormData({
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            email: '',
            estado: 'activo',
            // estado: 'activo',
          });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          // Almacenar los datos en el estado de datos mostrados
          setDatosMostrados([...datosMostrados, formData]);
      
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
                  placeholder="Ingresa tu Nombre"
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
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <br />
                <div>
                  Estado
                  <div>
                    <label htmlFor="activo">
                      Activo
                      <input
                        type="radio"
                        name="estado"
                        id="activo"
                        value="activo"
                        onChange={handleChange}
                        checked={formData.estado === 'activo'}
                      />
                    </label>
                    <label htmlFor="inactivo">
                      Inactivo
                      <input
                        type="radio"
                        name="estado"
                        id="inactivo"
                        value="inactivo"
                        onChange={handleChange}
                        checked={formData.estado === 'inactivo'}
                      />
                    </label>
                  </div>
                </div>
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
                <li>Email: {formData.email}</li>
                <li>Estado: {formData.estado}</li>
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
                      <th>Correo Electrónico</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMostrados.map((dato, index) => (
                      <tr key={index}>
                        <td>{dato.nombre}</td>
                        <td>{dato.apellido_paterno}</td>
                        <td>{dato.apellido_materno}</td>
                        <td>{dato.email}</td>
                        <td>{dato.estado}</td>
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