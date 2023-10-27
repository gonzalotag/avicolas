import { useEffect, useState, useRef } from "react";
import "../assets/css/tablaPersonal.css"
import { getRolRequest, getAllRoles } from "../api/rol.api";
import {deletePersona, getPerfiles } from "../api/perfil.api";
import RegistroPersonal from "./RegistroPersonal";
import HomeComponent from "./HomeComponent"
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Almacen from "./Almacen";



function TablaPersonal(props){
    const {setEspacioDeTrabajo}= props;
//guardado de contenido de tablas base de datos
    
    const [perfilesByRol,setPerfilesByRol]=useState([]);
    const [tipoRol,setTipoRol] = useState([]); 
//contenedor y hacer la comparacion entre roles y perfiles 
    const [selectRol, setSelectRol] = useState('');
//estado para mostrar ocultar    
    const [show,setShow ]= useState(true);
    const navigate = useNavigate();
    const [tablaPers,setTablaPers]= useState(true);

    const [valueForm, setValueForm]= useState({
        name,
        // lastname,
        // email,
        // password,
        // rol: ''
    });
//agarra la data q se esta ingresando en los inputs para poder enviar
    const handleInputChange =(event) =>{
        const {name , valueForm}= event.target;
        setValueForm({...valueForm,[name]: valueForm});
    }
//pone en espera los datos q se pusieron en el formulario
    const handleForm =(event)=>{
        event.preventDefault(valueForm)
        console.log(valueForm);
    }
    
        
//las funciones obtener para obtener(perfilesByRol,Roles) cada vez q mostremos algo en pantalla (renderiza)
    useEffect(()=>{
        obtenerPerfilesByRol()
        console.log(perfilesByRol)
        obtenerRoles()
        
    },[])
    async function obtenerPerfilesByRol(){
        const obtenerPerfiles = await getPerfiles()
        setPerfilesByRol(obtenerPerfiles);
    }
    async function obtenerRoles(){
        setTipoRol (await  getAllRoles())
        console.log(tipoRol)
    }


//aqui es donde se guarda los el dato colectado poder seleccionar roles 
    const handleSelect=(e) =>{
        setSelectRol(e.target.value);
    }

     const filterRol = perfilesByRol.filter((perfil)=>
    {
//perfil.id_rol === selectRol compara la id_rol con (selectRol) transformado a tipo de dato int
//por parseInt() para igualar al rol en la base de datos
        if (selectRol) {
            const evalu = perfil.id_rol === parseInt(selectRol);
            return  evalu;
        }else{
            return true;
        }
    });
    // funcion que elimina una fila de la tabla perfil en la base de datos
    const DeleteRow = async (index) => {
        try {
            const resp = await deletePersona(index);
            alert('Fila eliminada');
            window.location.reload();
            } catch (error) {
                console.error(error);
            }
    };
    // const {espacioReg ,setEspacioReg} =useState(<RegistroPersonal/>);

    return <div className="contenedorTabla">
            <div className="contenedorPersonal">
            Personal Registrado
            <div  className="nuevoPersonal" >
            <div className="buttonNuevoPersonal">
            {/* al hacer clic le dice cuando mostrar o no */}
            <button onClick={()=>{setShow(!show)}}>
                {!show ? "Regresar":"Nuevo registro"}
            </button>
            </div>
            {!show && <div className="nuevoRegistro">
                Registro de Personal
                <form className="registroForm" action="" onSubmit= {handleForm}>
                    <label htmlFor="">Nombre:</label>
                    <input 
                    type="text" 
                    value={valueForm.name}
                    name= "name"
                    onChange={handleInputChange}
                    />
                    
                    <br/>
                    
                    <label htmlFor="rol">Rol:</label>
                    <select name="" id="">
                        <option value=""></option>
                        <option value="{data.id}" >Proveedor</option>
                        <option value="{data.id}" >Cliente</option>
                        <option value="data.tipo">Empleado</option>
                        <option value="data.tipo">Adminstrador</option>
                    </select>
                    <br />
                    <button type="submit">Guardar</button>
                </form>
            </div> }
            </div>
            <div className={show ? selectRol : null}>
            </div> 
            {/* para recolectar solo un dato para cambiar entre roles  */}
            <div className="tablaSelectRol">
            <div className="selectRol">
            <select  id= "selectRoles" name="selectRoles" onChange={handleSelect}>
                <option></option>
                {tipoRol.map((data,index)=>{
                    return( 
                    <option value={data.id} key={index}>{data.tipo}</option>
                )})}
                                
                </select>
            </div>
            <div className="tabla">
            <table className="listaPersonal">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>elige un rol </th>
                    <th>accion</th>
                </tr>
                </thead>
                <tbody>
                    {/*filter.map(()=>{"info aqui"}) con este metodo se puede llenar toda la tabla con informacion recogido de perfil */}
                    {filterRol.map((data,index) =>{
                        return(<tr key={index}>
                        <td>{data.nombre}</td>
                        <td>{data.apellido_paterno}</td>
                        <td>{data.direccion}</td>
                        <td>{data.telefono}</td>
                        <td>{data.email}</td>
                        <td>{data.id_rol}</td>
                        <td>
                        {/* <Link to= "/editar">editar</Link> */}
                        {/* <button onClick={() => deleteRegistros()}>Eliminar</button> */}
                        
                        <Link to="/registros">
                            <button>pasar a editar</button>
                        </Link>
                        
                        <script></script>
                        <button onClick={() => DeleteRow(index)}>Eliminar</button>
                        </td>
                        
                    </tr>)
                    })}
                </tbody>
            </table>
            </div>
            </div>
            </div>
        </div>
}

export default TablaPersonal;