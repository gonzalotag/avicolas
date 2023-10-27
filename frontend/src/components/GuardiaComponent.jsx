import { useEffect, useState } from "react";
import LoginPerfil from "./LoginPerfil";

function GuardiaComponent (props){
    const {isAuth , setIsAuth, Component} = props;
    const [Permitido, setPermitido] = useState(<LoginPerfil setIsAuth ={setIsAuth}/> );
    
    useEffect (()=>{
        if(isAuth === true) setPermitido(Component)
        
    }),[]
    return (Permitido);
}
export default GuardiaComponent