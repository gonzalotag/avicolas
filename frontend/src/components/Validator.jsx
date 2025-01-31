import { useState } from "react";

function Validator(){
    const [valid,setValid]= useState('');
    const [result,setResult]= useState([]);
    
    const isNotEmpty = (msg) =>{
        if(!valid){
            setResult([...result,msg]);
    }
    };

    const isLength = (minLength,msg,maxLength) => {
        if(valid.length < minLength || valid.length > maxLength){
            setResult([...result,msg])
        }
    }

    const isEmail = (msg) =>{
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valid)){
            setResult([...result,msg])
        }
    }

    return
    
}   
export default Validator;