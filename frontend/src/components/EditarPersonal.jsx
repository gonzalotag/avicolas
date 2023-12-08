import"../assets/css/editarPersonal.css"
import { useParams , useNavigate } from "react-router-dom";
import React, { useEffect , useState } from "react";
import { getPerfilesById, patchPerfil } from "../api/perfil.api";

function EditarPersonal ( ){
    
  const {id} = useParams();
  const navigate=useNavigate();
  const [perfil ,setPerfil] = useState({
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
  const [initialPerfil, setInitialPerfil]= useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    direccion:'',
    telefono:'',
    email: '',
    estado: '',
    rol:'',
    contrasenia:''
  });
  const [nuevoRol , setNuevoRol] = useState ('');
  const [tieneContrasenia, setTieneContrasenia]=useState(false);
  const [selectEstado, setSelectEstado]=useState('');
  const [vistaPrevia,setVistaPrevia]= useState(null);

  const handleEstadoChange=(estado)=>{
    setSelectEstado(estado);
  }

  useEffect(()=>{
    const obtenerDatos = async ()=> {
      try {
        const datosPerfil = await getPerfilesById(id);
        setInitialPerfil(datosPerfil);
        setPerfil(datosPerfil);
        setTieneContrasenia(!!datosPerfil.contrasenia);
      } catch (error) {
        console.error('error al obtener datos del perfil', error);
      }
    };
    obtenerDatos();
  },[id]);

  useEffect(()=>{
    console.log ('Perfil',perfil);
  },[perfil, selectEstado, nuevoRol])

  const handleInputChange =  (e)=> {
    if(e.target.name === 'contrasenia'){
      setTieneContrasenia(e.target.value !== '');
    }  
    setPerfil({
      perfil,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleGuardar = async () => {
    try {
      const estadoInt = selectEstado === 'activo' ? 1 : selectEstado === "inactivo" ? 0 : null;
      if (estadoInt === null) {
        throw new Error("el estado seleccionado no es valido");
      }
      const perfilActualizado = {
        ...perfil,
        rol: nuevoRol || perfil.rol,
        estado : estadoInt || perfil.estado, 
      }
      const updatePerfil = await patchPerfil(id,perfilActualizado);
      // console.log('perfil actualizado', updatePerfil);
      setVistaPrevia({
        nombre:perfilActualizado.nombre,
        apellido_paterno:perfilActualizado.apellido_paterno,
        apellido_materno:perfilActualizado.apellido_materno,
        direccion:perfilActualizado.direccion,
        telefono:perfilActualizado.telefono,
        email:perfilActualizado.email,
        estado: perfilActualizado.estado===1?'activo':'inactivo',
        rol:tipoRol.find((rol)=>rol.id===perfilActualizado.id_rol)?.tipo||'no definido',
        contrasenia:perfilActualizado.contrasenia||'',
      
      })
      alert ("perfil actualizado con exito");
      navigate(`/editar/${id}`);
    } catch (error) {
      console.log('error al guardar el perfil',error);
      
    }
  }

  const handleCancelar =()=>{
    setPerfil(initialPerfil);
  }
  
  const isNumber = (evt)=> {
    evt = (evt) ? evt : window.event;
    //cambiar evt = (evt) ? evt : window.event; a uno mas actual
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode<48 || charCode >57)) {
       evt.preventDefault();
    }
 };

    return<div className="editarEspacio">
            <div className="botonRegresar">
              
              <button onClick={()=>navigate('/admin')}><h2>Regresar a Personal</h2></button>
            </div>
            <h1>Editar Perfil</h1>
            <div className="formulario">
              <form action="formEditar">
                <label htmlFor="nombre">
                  nombre
                </label>
                <br />
                <input 
                type="text"
                id="nombre" 
                name="nombre"
                value={perfil.nombre || ''}
                onChange={handleInputChange}
                />
                <br />
                <label htmlFor="apellido_apaterno">
                  apellido_paterno
                </label>
                <br />
                <input type="text" 
                id="apellido_paterno" 
                name="apellido_paterno"
                value={perfil.apellido_paterno}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="apellido_materno">
                  apellido_materno
                </label>
                <br />
                <input type="text" 
                id="apellido_materno" 
                name="apellido_materno"
                value={perfil.apellido_materno}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="direccion">
                  direccion
                </label>
                <br />
                <input type="text" 
                id="direccion" 
                name="direccion"
                value={perfil.direccion}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="telefono">
                  telefono
                </label>
                <br />
                <input type="text"
                id="telefono" 
                name="telefono"
                pattern="[0-9]{7,10}"
                maxLength='10'
                minLength='7'
                value={perfil.telefono}
                onChange={handleInputChange}
                onKeyDown={isNumber}
                />
                <br />
                <label htmlFor="email">
                  email
                </label>
                <br />
                <input type="text"
                id="email" 
                name="email"
                value={perfil.email}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="estado">Estado</label>
                <br />
                <select 
                id="estado"
                name="estado" 
                value={selectEstado}
                onChange= {(e) => {handleEstadoChange(e.target.value)}}>
                  <option value=""></option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
                <br />
                <label htmlFor="rol">
                   Nuevo Rol:
                </label>
                <br />
                <select 
                name="rol" 
                id="rol"
                value={nuevoRol}
                onChange={(e) =>setNuevoRol(e.target.value)}
                >
                  <option value=""></option>
                  <option value="administrador">Administrador</option>
                  <option value="proveedor">Proveedor</option>
                  <option value="cliente">Cliente</option>
                  <option value="empleado">Empleado</option>
                </select>
                <br />
                {tieneContrasenia &&(
                <React.Fragment>
                  <label htmlFor="contrasenia">
                  contrasenia
                </label>
                <br />
                <input type="text" 
                id="contrasenia" 
                name="contrasenia"
                value={perfil.contrasenia||''}
                onChange={handleInputChange}
                />
                <br />
                </React.Fragment>)}
                
                <button type="button" onClick={handleGuardar}>Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
                <button>Vista Previa</button>
              </form >
              {vistaPrevia &&(
                <div className="objetoDatos">
                  <h2 className="titleList">datos nuevo</h2>
                  <ul>
                  <li>Nombre:{vistaPrevia.nombre}</li>
                  <li>Apellido Paterno{vistaPrevia.apellido_paterno}</li>
                  <li>Apellido Materno{vistaPrevia.apellido_materno}</li>
                  <li>Direccion{vistaPrevia.direccion}</li>
                  <li>Telefono{vistaPrevia.telefono}</li>
                  <li>Email{vistaPrevia.email}</li>
                  <li>Estado{vistaPrevia.estado}</li>
                  <li>Rol{vistaPrevia.rol}</li>
                  {vistaPrevia.rol === 'administrador'&&(
                  <li>Contrasenia{vistaPrevia.contrasenia}</li>
                  )}
                  </ul>
                </div>
                )}
            </div>            
          </div>
}

export default EditarPersonal;