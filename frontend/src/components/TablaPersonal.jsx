import { useEffect, useState, useRef } from "react";
import "../assets/css/tablaPersonal.css"
import { getRolRequest, getAllRoles } from "../api/rol.api";
import { getPerfiles } from "../api/perfil.api";



function TablaPersonal(props){
//guardado de contenido de tablas base de datos
    const [perfilesByRol,setPerfilesByRol]=useState([]);
    const [tipoRol,setTipoRol] = useState([]); 
//contenedor y hacer la comparacion entre roles y perfiles 
    const [selectRol, setSelectRol] = useState('');
//estado para mostrar ocultar    
    const [show,setShow ]= useState(true);
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
//perfil.id_rol === selectRol asi como el if siempre entregaran 2 resultados true o false dependera mucho la interpretacion del if para devolver una repuesta
        if (selectRol) {
            const evalu = perfil.id_rol === parseInt(selectRol);
            return  evalu;
        }else{
            return true;
        }
    });

    
    
    return <div className="contenedorTabla">
            
        <div className="contenedorPersonal">
            Personal Registrado
            <div  className="nuevoPersonal" >
            <div className="buttonNuevoPersonal">
            {/* al hacer clic le dice cuando mostrar o no */}
            <button onClick={()=>{setShow(!show)}}>
                {!show ? "Nuevo registro":"Regresar"}
                {/* cambia el nombre de boton al hacer clic */}
                {/* {show ? `Nuevo Personal` : `regresar`} */}
            </button>
            </div>
            {!show && <div className="nuevoRegistro">
                Registro de Personal
                <form className="registroForm" action="registroPersonal" method="post">
                    <label htmlFor="">Nombre:</label>
                    <input type="text" id="nombre" required/>
                    <br />
                    <label htmlFor="apellidos"> Apellido paterno:</label>
                    <input type="text" id="apellidoPaterno" required/>
                    <br />
                    <label htmlFor="apellidos"> Apellido Materno:</label>
                    <input type="text" id="apellidoMaterno" required/>
                    <br />
                    <label htmlFor="direccion">Direccion:</label>
                    <input type="text" id="direccion"/>
                    <br />
                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" required/>
                    <br />
                    <label htmlFor="email">Correo Electronico:</label>
                    <input type="email" id="correoelectronico" required/>
                    <br />
                    <label htmlFor="rol">Rol:</label>
                    <input type="rol" id="id_rol" required/>
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