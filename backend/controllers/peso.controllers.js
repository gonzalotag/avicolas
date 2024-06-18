import {pool }from "../db.js";

export const getAllPeso = async (req,res) =>{
    try {
        const [result] =await pool.query("SELECT * FROM peso");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send('Server error');
    }
}

export const getPeso = async (req,res)=>{
    try {
        const {id}= req.params;
        const [result]= await pool.query("SELECT * FROM peso WHERE id=?",[id])
        if(!result.length){
            return res.status(404).json({msg:"No se encontró el registro"})
        }else{
            res.status(200).json(result[0])
            }
    } catch (error) {
    }
}

export const createPeso =async (req,res) =>{
    try {
        const {peso_promedio}= req.body;
        const result = await pool.query("insert into peso (peso_promedio) VALUES (?);", [peso_promedio]);
        res.status(200).json({message:"registro creado"});
    } catch (error) {
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updatePeso = async (req,res) =>{
    const {id} = req.params;
    const {peso_promedio} = req.body;
    if (peso_promedio === undefined ) {
        return res.status(400).json({message: "el campo peso  promedio es requerido"});
    }
    try {
        const [result] = await pool.query("UPDATE peso SET peso_promedio =? WHERE id=?", [peso_promedio,id]);
        if(result.affectedRows === 0){
            return res.status(404).json({message:`No se encontró el peso_promedio con la ID "${id}"`});
        } else {
            return res.status(200).json({message:`Se actualizó correctamente el peso_promedio ${id}`});           
        }
    } catch (error) {
        console.log('error en el servidor' , error);
        return res.status(500).json({msg: 'Error en el servidor'});
        
    }
}

export const deletePeso = async(req,res) =>{
    const {id} = req.params;
    try {
        const resultado = await pool.query("select * from peso where id=?",[id]);
        if (resultado === 0) {
            return res.status(404).send("no existe peso con ese id");
        }
        const result = await pool.query('DELETE FROM peso WHERE id=?',[id]);
        if(result.affectedRows ===0){
            return res.status(404).send("no se ha eliminado peso");
        }
        return res.status(200).send("se elimino co exito");
    } catch (error) {
        res.status(500).send("error interno del servidor");
    }
    
}