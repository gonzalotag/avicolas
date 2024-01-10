import { pool } from "../db.js";

export const getAllMedicinas =async (req,res)=>{
    try{
        const result=await pool.query('SELECT * FROM medicina');
        res.status(200).json({message:"Lista de Medicamentos",data:result});
        }catch(error){
            console.log(error);
            res.status(400).json({message: 'Error al obtener la lista de Medicamentos'})
        }
};

//funcion para seleccionar un medicamento mediante el id
export const getMedicina=(req,res)=>{
    const {id}=req.params;
    const consulta= `SELECT * FROM medicina WHERE id_medicina=${id}`;
    pool.query(consulta)
    .then((response)=>{
        if(response.length>0){
            res.status(200).json(response[0]);
            }else{
                res.status(404).json({message:'No se encontró el Medicamento con ese ID'});
            }
        })
        .catch((err)=>console.log(err));
}


// async function getAllMedicinas (){
//     let medicinaLista=await pool.query('SELECT * FROM medicina');
//     return medicinaLista;
// }

export const updateMedicinas =async (req,res)=>{
    try {
    //validar si el id es numerico
        if(isNaN(req.params.id)){
            return res.status(400).send("El ID debe ser numérico");
        }    
        //buscar en BD y verificar si existe el registro a ed
        const medicaExists= await getMedicinaById(req.params.id)
        if(!medicaExists)
        return res.status(400).json({message:'No se encontró la Medicina con ese ID'});
        //validar el cuerpo de la solicitud contiene los datos necesarios
        const {nombre,tipo,num_dosis,precio,cantidad}= req.body;
        if (!nombre|| !tipo|| !num_dosis|| !precio|| !cantidad) {
            return res.status(400).json({message:'todos los campos son obligatorios'});
        }
        //si existe actualizar los campos que llegan por params
        const medicinaUpdate={
            nombre:(nombre)?nombre:medicaExists.nombre,
            tipo:(tipo)?tipo:medicaExists.tipo,
            num_dosis:(num_dosis>0)?num_dosis:medica.num_dosis,
            precio:parseFloat(precio),
            cantidad:parseInt(cantidad),
            };
            const result=await pool.query('UPDATE medicina SET ? WHERE id=?',[medicinaUpdate,req.params.id]);
            res.status(201).json({message:'Se ha actualizado la información',data:result.affectedRows});
    } catch (error) {
        console.log(error);
        res.status.json({message:'error interno del servidor'})
    }
}
export const createMedicinas = async (req,res)=>{
    try {
        //verificar si tiene todos los parametros
        const{nombreMedicina,tipoMedicina,dosisMedicina,precioMedicina,cantidadMedicina}=req.body;
        console.log("valores delos parametros",{nombreMedicina,tipoMedicina,dosisMedicina,precioMedicina,cantidadMedicina})
        if (!nombreMedicina ||!tipoMedicina  || !dosisMedicina || !precioMedicina|| !cantidadMedicina ) {
            console.log("campos faltantes, retornando 400 Bad Request")
            return res.status(400).json({message:"Todos los campos sonrequeridos"})}
            
            const medicaNueva={
                nombre:nombreMedicina,
                tipo:tipoMedicina,
                num_dosis:dosisMedicina,
                precio:precioMedicina,
                cantidad:cantidadMedicina
            };
            console.log("objeto medicaNueva",medicaNueva)
            const result= await pool.query("INSERT INTO medicina set ?", [medicaNueva]);
            console.log("resultado de insercion en la base de datos ", result);

            res.status(201).json({message:"La medicina fue agregada correctamente", data:result.insertId});
            // console.log(req,body);
        }catch(e){
            console.error("error en la funcion createMEdicinas", e);
            res.status(500).json({message: "Error interno del servidor", code: e.code});
    }
}

export const deleteMedicina =async (req,res)=>{
    try {
        const result=await pool.query('DELETE FROM medicina WHERE id=?',[req.params.id]);
        if(!result.affectedRows) {
            throw new Error ('No se ha encontrado una medicina con ese ID')
        }
            res.status(200).json({message:'Se ha eliminado la medicina'});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Error Interno del Servidor', code: error.code});
        }
}

// export{
// getAllMedicinas}