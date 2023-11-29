import"../assets/css/editarPersonal.css"
import { Link, useParams , useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
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
  

  useEffect(()=>{
    const obtenerDatos = async ()=> {
      try {
        const datosPerfil = await getPerfilesById(id);
        setInitialPerfil(datosPerfil);
        setPerfil(datosPerfil);
      } catch (error) {
        console.error('error al obtener datos del perfil', error);
      }
    };
    obtenerDatos();
  },[id]);

  useEffect(()=>{
    console.log ('Perfil',perfil);
  },[perfil])

  // useEffect(()=>{
  //   const obtenerPerfil = async () =>{ 
  //     try {
  //       const respuesta =await getPerfilesById(id);
  //       const datos = await respuesta.json();
  //       setPerfil(datos);
  //     } catch (error) {
  //       console.error('error al obtener perfil', error)
  //     }
  //   }
  //   obtenerPerfil();
  // },[]);

  const handleInputChange =  (e)=> {
    const {name,value} = e.target;
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      [name]:value,
    }));
  }
  
  const handleGuardar = async () => {
    try {
      await patchPerfil(id,perfil);
      alert ("perfil actualizado con exito");
      navigate(`/editar/${id}`);
    } catch (error) {
      console.log('error al guardar el perfil',error);
    }
  }

  const handleCancelar =()=>{
    setPerfil(initialPerfil);
  }
  
  const soloNumeros = (event) =>{
    const charCode = event.charCode || event.keycode;
    if (charCode === 8 || charCode === 46){
      return true;
    }
    if (charCode >= 48 && charCode <= 57){
      return true;
    }
    return false;
  }

    return<div className="editarEspacio">
            <div className="botonRegresar">
              <Link 
              onClick={(e)=>{e.preventDefault(); 
              navigate("/personal")}}>
                <button> Regresar a Personal </button>
              </Link>
            </div>
            <h1>Editar Perfil</h1>
            <div className="formulario">
              <form action="">
                <label htmlFor="">
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
                <label htmlFor="">
                  apellido_paterno
                </label>
                <br />
                <input type="text" 
                id="apellido_paterno" 
                name="apellido_paterno"
                value={perfil.apellido_paterno}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="">
                  apellido_materno
                </label>
                <br />
                <input type="text" 
                id="apellido_materno" 
                name="apellido_materno"
                value={perfil.apellido_materno}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="">
                  direccion
                </label>
                <br />
                <input type="text" 
                id="direccion" 
                name="direccion"
                value={perfil.direccion}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="">
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
                onKeyDown={soloNumeros}
                />
                <br />
                <label htmlFor="">
                  email
                </label>
                <br />
                <input type="text"
                id="email" 
                name="email"
                value={perfil.email}
                onChange={handleInputChange}/>
                <br />
                <label htmlFor="">
                  estado
                </label>
                <br />
                <input type="text" 
                id="estado" 
                name="estado"
                value={perfil.estado}
                onChange={handleInputChange}/>
                <br />
                {/* <label htmlFor="">
                  rol
                </label>
                <br />
                <input type="text" 
                id="rol" 
                name="rol"
                value={perfil.rol}
                onChange={handleInputChange}/>
                <br /> */}
                <label htmlFor="">
                  contrasenia
                </label>
                <br />
                <input type="text" 
                id="contrasenia" 
                name="contrasenia"
                value={perfil.contrasenia||''}
                onChange={handleInputChange}/>
                <br />
                <button type="button" onClick={handleGuardar}>Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
              </form>
            </div>            
          </div>
}

export default EditarPersonal;