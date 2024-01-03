import"../assets/css/editarPersonal.css"
import { useParams , useNavigate } from "react-router-dom";
import React, { useEffect , useState } from "react";
import { getPerfilesById, patchPerfil } from "../api/perfil.api";

function EditarPersonal ( ){
  //se usa useParams para no esta batallando en menejar el id del perfil a editar
  const {id} = useParams();
  const navigate=useNavigate();
  //state perfil para almacenar los datos de perfil q se van a editar 
  const [perfil ,setPerfil] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    direccion: '',
    telefono: '',
    email: '',
  });
  
  const [mostrarVistaPrevia,setMostrarVistaPrevia]= useState(false);
  //el hook useEffect para cargar los datos de perfil cuando vayamos a editar 
  useEffect(()=>{
    const obtenerDatos = async ()=> {
      try {
        const datosPerfil = await getPerfilesById(id);
        // console.log('datos obtenidos de perfil', datosPerfil);
        setPerfil(datosPerfil);
      } catch (error) {
        console.error('error al obtener datos del perfil', error);
      }
    };
    obtenerDatos();
  },[id]);

  const handleVistaPrevia = () => {
    setMostrarVistaPrevia(true);
  };
//maneja los nuevos cambios en perfil y actualiza el perfil 
  const handleInputChange =  (e)=> {
    const {name, value} = e.target;
    setPerfil((prevPerfil) =>({
      ...prevPerfil,
      [name]: value,
    }));
    setMostrarVistaPrevia(false);
  }
//guarda los cambios mediante el uso del api patchPerfil
  const handleGuardar = async () => {
    try {
      // console.log('perfil actualizado antes de patchPerfil',perfil);
      await patchPerfil(id,perfil,(response) =>{
        if(response && response.status === 200){
          alert('perfil actualizado con exito');
          navigate(`/editar/${id}`);
        }else{
          console.log('error al guardar el perfil',response); 
        }
      });
    } catch (error) {
      console.log('error al guardar el perfil',error); 
    }
  }
//restablece el estado del perfil y lo reinicia al estado inicial
  const handleCancelar = async () => {
    const datosOriginales = await getPerfilesById(id);
    setPerfil(datosOriginales);
    navigate(`/editar/${id}`);
  }
// validacion de solo numeros para el campo de telefono 
  const isNumber = (evt)=> {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode<48 || charCode >57)) {
       evt.preventDefault();
    }
  };

    return(
    <div className="editarEspacio">
            <div className="botonRegresar">
              <button onClick={()=>navigate('/admin')}><h2>Regresar a Personal</h2></button>
            </div>
            <h1>Editar Perfil</h1>
            <div className="formularioEdit">
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
                <button type="button" onClick={handleGuardar}>Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
                <button type="button" onClick={handleVistaPrevia}>Vista Previa</button>
              </form >
              {mostrarVistaPrevia &&(
                <div className="objetoDatos">
                  <h2 className="titleList">Datos Modificados</h2>
                  <ul>
                  <li>Nombre: {perfil.nombre}</li>
                  <li>Apellido Paterno: {perfil.apellido_paterno}</li>
                  <li>Apellido Materno: {perfil.apellido_materno}</li>
                  <li>Direccion: {perfil.direccion}</li>
                  <li>Telefono: {perfil.telefono}</li>
                  <li>Email: {perfil.email}</li>
                  </ul>
                </div>
                )}
            </div>            
          </div>
    );
}
export default EditarPersonal;