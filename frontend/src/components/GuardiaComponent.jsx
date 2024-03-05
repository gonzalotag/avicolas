import { useEffect, useState } from "react";
import LoginPerfil from "./LoginPerfil";

function GuardiaComponent (props){
    const {isAuth , setIsAuth, Component} = props;
    const [permitido, setPermitido] = useState(<LoginPerfil setIsAuth ={setIsAuth}/> );
    
    useEffect (()=>{
        if(isAuth === true) 
        setPermitido(Component)
    },[isAuth,Component])
    return (permitido);
}
export default GuardiaComponent