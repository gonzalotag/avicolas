import axios from "axios";

async function getRolRequest (id){
    
    const result = await axios.get("http://localhost:4000/rol/" + id )
    return result;
}

export{
    getRolRequest
}