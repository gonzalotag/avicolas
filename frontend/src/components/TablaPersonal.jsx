import { useEffect, useState } from "react";
import "../assets/css/tablaPersonal.css"
import { getRolRequest, getAllRoles } from "../api/rol.api";
import { getPerfiles } from "../api/perfil.api";


// import axios from 'axios';

function TablaPersonal(props){
    // const {perfiles,getPerfilesByRol,getRolesByName}=props;
    const [perfilesByRol,setPerfilesByRol]=useState([]);
    const [tipoRol,setTipoRol] = useState([]);
    const [selectRol, setSelectedRol] = useState('');
    
    useEffect(()=>{
        obtenerPerfilesByRol()
        console.log(perfilesByRol)
    },[])
    async function obtenerPerfilesByRol(){
        const obtenerPerfiles = await getPerfiles()
        setPerfilesByRol(obtenerPerfiles);
    }
    useEffect(()=>{
        obtenerRoles()
        // console.log(tipoRol)
    },[])
    async function obtenerRoles(){
        setTipoRol (await  getAllRoles())
        console.log(tipoRol)
     }
     const handleSelect=(e) =>{
        setSelectedRol(e.target.value);
        //console.log(selectRol)
     }
     const filterRol = perfilesByRol.filter((perfil)=>
     {
        //perfil.id_rol === selectRol
        if (selectRol) {
            const evalu = perfil.id_rol === parseInt(selectRol);
            return  evalu;
        }else{
            return true;
        }

    });
    //     if(selectData){
    //         setSelectedRol(selectData);
    //     }else{
    //         setSelectedRol([]);
    //     }
    //  }
    // function optionRoles(e)  {
    //     const valor= e.target;
    //     const rolSelect= [];
    //     for(let i=0; i< valor.length; i++){
    //             if(valor[i].selected ){
    //                 rolSelect.push(valor[i].value)
    //             }}
    // }
    // async function obtenerPerfiles(){
    //     const perfiless = (await getPerfiles());
    //     console.log(perfiless)
    // onChange={(e)=>{handleSelect(e.target.value)}}
    return <div className="contenedorTabla">
        <div >
            Personal Registrado
            
            <button>nuevo personal</button>
            <select id= "selectRoles" name="selectRoles" onChange={handleSelect}>
                <option value="" selected>  </option>
                {tipoRol.map((data,index)=>{

                    return( 
                        
                    <option value={data.id} key={index}>{data.tipo}</option>
                )})}
                                
                </select>
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
                {/* <tr>
                    <td>raul</td>
                    <td>aplellido1 apellido2</td>
                    <td> ubicacion</td>
                    <td> 4234512</td>
                    <td> svg@gmail.com</td>
                </tr> */}
                </tbody>
            </table>
            
        {/* Registro de Personal
        <div className="nombrePersonal">
            <p>
                Nombre
            </p>
            <input type="text" />
        </div>
        <div className="apellidoPersonal">
            <p>
                Apellido Paterno
            </p>
            <input type="text" />
            <p>
                Apellido Materno
            </p>
            <input type="text" />
        </div>
        <div className="direccionPersonal">
            <p>
                Direccion
            </p>
            <input type="text" />
        </div>
        <div className="telefonoPersonal">
            <p>
                telefono
            </p>
            <input type="text" />
        </div>
        <div className="emailPersonal">
            <p>
                email
            </p>
            <input type="email" />
        </div>
        <div>
            <button>
                guardar
            </button>
        </div> */}
        </div>
    </div>
}

export default TablaPersonal;