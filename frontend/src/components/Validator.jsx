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
    <div className="validator">
        <input 
        type="text"
        value={valid} 
        onChange={(e) => setValid(e.target.valid)}/>
        <button onClick={()=>isNotEmpty('este campo no debe ser vacio')}>
            revisado no vacio
        </button>
        <button onClick={()=>isLength(10,50, 'este campo debe tener entre 2y 50 caracteres')}> 
            revisado longitud
        </button>
        <button onClick={()=>isEmail('este campo debe ser un email valido')}>
            revisado email
        </button>
        <div>
            {result.map((error,index)=>(
            <p key={index}>{item}</p>
            ))}
            
        </div>
    </div>
}   
export default Validator;