import { useEffect, useState, useRef } from "react";
import "../assets/css/tablaPersonal.css"
import {getAllRoles } from "../api/rol.api";
import {deletePersona, getPerfiles } from "../api/perfil.api";
import { useNavigate } from "react-router-dom";

function TablaPersonal(){
    const [perfilesByRol,setPerfilesByRol]=useState([]);
    const [tipoRol,setTipoRol] = useState([]); 
//contenedor y hacer la comparacion entre roles y perfiles 
    const [selectRol, setSelectRol] = useState('');    
    const navigate = useNavigate();
//las funciones obtener para obtener(perfilesByRol,Roles) cada vez q mostremos algo en pantalla (renderiza)
    useEffect(()=>{
        obtenerPerfilesByRol()
        // console.log(perfilesByRol)
        obtenerRoles()
    },[])
    async function obtenerPerfilesByRol(){
        const obtenerPerfiles = await getPerfiles()
        setPerfilesByRol(obtenerPerfiles);
    }
    async function obtenerRoles(){
        setTipoRol (await  getAllRoles())
        // console.log(tipoRol)
    }
//aqui es donde se guarda los el dato colectado poder seleccionar roles 
    const handleSelect=(e) =>{
        setSelectRol(e.target.value);
    }
//filtra rol comparando en las tablas rol y perfil 
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
    // funcion que elimina una fila de la tabla perfil en la base de datos pero no 
    //hay similitud de indices al borrar, borra aleatoriamente
    const deleteRow = async (id) => {
        try {
            await deletePersona(id);
            alert('Fila eliminada');
            window.location.reload();
            // navigate('/admin');
            } catch (error) {
                console.error(error);
            }
    };
    return <div className="contenedorTabla">
            <div className="contenedorPersonal">
            Personal Registrado
            <div  className="nuevoPersonal" >
            <div className="buttonNuevoPersonal">
            {/* al hacer clic le dice cuando mostrar o no */}
            <button onClick={()=> navigate('/registros')}> <h2>Nuevo Registro</h2>
            </button>
            </div>
            </div>
            {/* para recolectar solo un dato para cambiar entre roles  */}
            <div className="tablaSelectRol">
            <div className="selectRol">
                Seleccione Rol:
            <select  id= "selectRoles" title="selecetRol" name="selectRoles" onChange={handleSelect}>
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
                    <th>Apellido</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Rol </th>
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
                        {/* <td>{data.id_rol}</td> */}
                        <td>{tipoRol.find((rol)=>rol.id === data.id_rol)?.tipo || "No definido "}</td>
                        <td>
                        {/* <Link to="/editar" onClick={(e)=>{e.preventDefault(); navigate('/editar')}}>
                            <button>pasar a editar</button>
                        </Link> */}
                        {/* <Link to ={`/editar/${data.id}`}>
                            <button>editar</button>
                        </Link> */}
                        <button onClick={()=> navigate('/editar/${data.id}')}>editar </button>
                        {/* elimina una fila de la tabla de personal (buscar por q elimina solo al seleccionar rol y no sin seleccionar) */}
                        <button onClick={() => deleteRow(data.id)}>Eliminar</button>
                        
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