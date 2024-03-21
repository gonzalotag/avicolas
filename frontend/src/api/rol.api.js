import axios from "axios";

async function getRolRequest (id){
    // console.log("ID de rol recibido", id);
    const result = await axios.get("http://localhost:4000/rol/" + id )
    // console.log("respuesta de getRolRequest",result);
    return result;
}

async function getAllRoles (){
    const result = await axios.get("http://localhost:4000/rol")
    //console.log(result)
    return result.data;
}

export{
    getRolRequest,
    getAllRoles,
}
