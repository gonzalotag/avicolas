import React,{createContext, useContext, useState} from "react";


const AlmacenContext = createContext ();
export const AlmacenProvider = ({children}) => {
    const [datosAlmacen ,setDatosAlmacen]= useState({
        alimentos:[],
        galpones:[],
        lotes:[],
        medicinas:[]
    });
    return (
        <AlmacenContext.Provider value={{ datosAlmacen, setDatosAlmacen}}>
            {children}
        </AlmacenContext.Provider>
            );
}
export const useAlmacen = () => {
    return useContext(AlmacenContext);
}