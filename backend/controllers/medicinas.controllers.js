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

export const updateMedicina =async (req,res)=>{
    const {id}=req.params;
    const {nombre, via, num_dosis, precio, cantidad}=req.body;
    try {
        const [result] = await pool.query('UPDATE medicina SET nombre=?, via=?, num_dosis=?, precio=?, cantidad=? WHERE id=?',
            [nombre, via , num_dosis, precio, cantidad, id]);
            if (result.affectedRows === 0) {
                res.status(404).json({message:'No se encontró la Medicina con ese ID'})
            } else {
                res.status(200).json({message:'medicina actualizada correctamente'});
            }
    } catch (error) {
        res.status(500).json({message:'error interno del servidor' +error.message});
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
