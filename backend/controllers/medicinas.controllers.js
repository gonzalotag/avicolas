import { pool } from "../db.js";

export const getAllMedicinas =async (req,res)=>{
    try {
        const [result] = await pool.query("SELECT * FROM medicina");
        res.json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
};

export const getMedicina=(req,res)=>{
    const id=req.params;
    try {
        const [consult]= pool.query(`SELECT * FROM medicina WHERE id=${id}`);
        if (consult.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({message:"no se encontro medicamento con ese id "})
        }
    } catch (error) {
        res.status(500).json({message:"error interno del servidor"})
    }
}

export const updateMedicinas =async (req,res)=>{
    try {
        if(isNaN(req.params.id)){
            return res.status(400).send("El ID debe ser numérico");
        }
        const medicaExists= getMedicina(req.params.id)
        if(!medicaExists)
        return res.status(400).json({message:'No se encontró la Medicina con ese ID'});
        const {nombre,via,num_dosis,precio,cantidad}= req.body;
        if (!nombre|| !via|| !num_dosis|| !precio|| !cantidad) {
            return res.status(400).json({message:'todos los campos son obligatorios'});
        }
        const medicinaUpdate={
            nombre:(nombre)?nombre:medicaExists.nombre,
            via:(via)?via:medicaExists.via,
            num_dosis:(num_dosis>0)?num_dosis:medica.num_dosis,
            precio:parseFloat(precio),
            cantidad:parseInt(cantidad),
            };
            const result=await pool.query('UPDATE medicina SET ? WHERE id=?',[medicinaUpdate,req.params.id]);
            res.status(201).json({message:'Se ha actualizado la información',data:result.affectedRows});
    } catch (error) {
        res.status.json({message:'error interno del servidor'})
    }
}
export const createMedicinas = async (req,res)=>{
    try {
        const{nombreMedicina,viaMedicina,dosisMedicina,precioMedicina,cantidadMedicina}=req.body;
        if (!nombreMedicina ||!viaMedicina  || !dosisMedicina || !precioMedicina|| !cantidadMedicina ) {
            return res.status(400).json({message:"Todos los campos sonrequeridos"})}
            const medicaNueva={
                nombre:nombreMedicina,
                via:viaMedicina,
                num_dosis:dosisMedicina,
                precio:precioMedicina,
                cantidad:cantidadMedicina
            };
            const result= await pool.query("INSERT INTO medicina set ?", [medicaNueva]);
            res.status(201).json({message:"La medicina fue agregada correctamente", data:result.insertId});
        }catch(e){
            res.status(500).json({message: "Error interno del servidor", code: e.code});
    }
}

export const deleteMedicina =async (req,res)=>{
    try {
        const result=await pool.query('DELETE FROM medicina WHERE id=?',[req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message:"  No se encontró una medicina con ese ID"});
        }else{
            res.status(204).send();
        }
        
    } catch (error) {
        res.status(500).json({message: 'Error Interno del Servidor', code: error.code});
    }
}
