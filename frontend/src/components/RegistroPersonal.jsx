import "../assets/css/registroPersonal.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postPerfil } from "../api/perfil.api";

function RegistroPersonal(){
    
  const navigate=useNavigate();
    //es el estado donde se pondra desde el nombre hasta la contrasenia
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
  //estado para poder mostrar el formData antes de guardar el formulario
  const [vistaPrevia, setVistaPrevia]=useState(null);
//es para manejar las actualizaciones al formData segun los cambios en el formulario
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
//donde se va a poner los nuevos datos temporalmente para luego mostrarlos en el html
  const handleVistaPrevia =()=>{
    const vistaPreviaData ={
      ...formData,
      estado: selectEstado === 'activo' ? 'Activo' : 'Inactivo'
    }
    setVistaPrevia(vistaPreviaData);
      console.log("data previa",vistaPreviaData);
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
// funcion isNumber para poder ingresar solo numeros en un input
  const isNumber = (evt)=> {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode<48 || charCode >57)) {
          evt.preventDefault();
      }
  };

//se utiliza para procesar y enviar los datos del formulario al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contraseniaValue= formData.rol === 'administrador' ? formData.contrasenia :null;
    const dataToAdd = {
      ...formData,
      estado:selectEstado === 'activo',
      rol: formData.rol,
      contrasenia: contraseniaValue,
    };
    console.log('datos a guardar', dataToAdd)
    try{
      const response = await postPerfil(dataToAdd);
      alert('perfil creado con exito');
      console.log('perfil guardado con exito' , response.data);
      handleCancelar();            
    }catch (error){
      console.error('error al guardar el perfil',error);
    }  
  }

  const handleTextChange =(e, fieldName)=>{
    const regex = /^[a-zA-Z\s]*$/;
    if(!regex.test(e.target.value)) {
        return;
    }
    setFormData({...formData,[fieldName]:e.target.value});
  }
        return (
          <div className="regPersonal">
            <div className="contenedorButtonAndTitle">
            <div className="buttonRegresar">
                <button onClick={()=>navigate('/admin/personal')}> 
                  <h2>Regresar a Personal</h2>
                </button>
            </div>    
            <h2 className="titleForm"> Registrar Personal</h2>
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
                  onChange={(e)=> handleTextChange(e, "nombre")}
                />
                <br />
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input
                  type="text"
                  id="apellido_paterno"
                  name="apellidoPat"
                  value={formData.apellido_paterno}
                  onChange={(e)=> handleTextChange(e, "apellido_paterno")}
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
                  onChange={(e)=> handleTextChange(e, "apellido_materno")}
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
                onKeyPress = {isNumber}
                onChange={handleChange}
                placeholder="Ingresar Telefono"
                required/>
                <br />
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
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
                        value={formData.rol}
                        onChange={handleChange}>    
                        <option value="">Seleccionar Rol</option>
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
                    Guardar</button>
                <button type="button" onClick={handleCancelar}>
                    Cancelar</button>
              </div>
              <div className="objetoDatos">
                <h2 className="titleList">Datos Nuevo Registro</h2>
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