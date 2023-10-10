import { useEffect, useState } from "react";
import "../assets/css/tablaPersonal.css"
import { getPerfilesByRol } from "../api/perfil.api";

function TablaPersonal(){
    // const [rol, setRol]=
    const id_rol = 4
    const perfiles = obtenerPerfilesByRol();
    // async function obtenerPerfiles(){
    //     const perfiless = (await getPerfiles());
    
    //     console.log(perfiless)
    // }
    // const obtenerData= async ()=>{
    //     const data = await getPerfiles();
    // } 
    
    // return <div className="tablaPersonal">
    //     <p>Gestion de Personal</p>
    //     <div className="buttonRegistroPersonal">
    //         <button className=" registroPersonal">
    //             registro de personal
    //         </button>
    //         <div className="tablaPersonalActual">
    //         {/* {obtenerPerfiles} */}
    //         </div>
    //     </div>
    // </div>
    async function obtenerPerfilesByRol(){
        
        const empleados = (await getPerfilesByRol(id_rol));
        console.log(typeof(empleados));
        return empleados;
    }
    return <div className="contenedorTabla">
            <table className="listaPersonal">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {perfiles.map((data)=>{
                        return(<tr>
                        <td>data.nombre</td>
                        <td>aplellido1 apellido2</td>
                        <td> ubicacion</td>
                        <td> 4234512</td>
                        <td> svg@gmail.com</td>
                    </tr> )
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
}

export default TablaPersonal;