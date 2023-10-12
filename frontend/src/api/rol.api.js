import axios from "axios";

async function getRolRequest (id){
    
    const result = await axios.get("http://localhost:4000/rol/" + id )
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
