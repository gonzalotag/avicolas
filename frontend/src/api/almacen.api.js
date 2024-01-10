import axios from "axios";

async function getAlmacenes(){
    const res = await axios.get('http://localhost:4000/almacen');

}

async function getAlmacen(id){
    const res = await axios.get(`http://localhost:4000/api/almacen/${id}`);
    return res;
    }

async function postAlmacen(id,data) {
    try {
        let response=await axios.post(`http://localhost:4000/api/almacen/${id}`, data);
        console.log("Se agrego el almacen correctamente");
        return response;
        
    } catch (error) {
        console.log(error);
    }
}
async function patchAlmacen(id,dataAlmacen) {
    try {
        //console.log(dataAlmacen);
        let response = await axios.patch(`http://localhost:4000/api/almacen/${id}`,dataAlmacen );
        // console.log(response);
        alert("Los datos del Almacén se actualizaron con exito")
        return response;
    } catch (error) {
        alert("Ocurrio un error al intentar Actualizar los Datos del Almacen");
        console.log(error);
    }
}
async function deleteAlmacen(id) {
    try {
        let respuesta =  await axios.delete(`http://localhost:4000/api/almacen/${id}`);
        if(respuesta.status==200){
            alert("El registro fue eliminado exitosamente");
            }else{
                alert("No se pudo Eliminar el Registro");
                }
                return respuesta;
        
    } catch (error) {
        alert("Error en la eliminación de Registros");
        console.log(error);
    }
}

export {
    getAlmacenes,
    getAlmacen,
    postAlmacen,
    patchAlmacen,
    deleteAlmacen
}