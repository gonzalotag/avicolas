import {pool }from "../db.js";

export const getAllPeso = async (req,res) =>{
    try {
        const [result] =await pool.query("SELECT * FROM peso");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

export const getPeso = async (req,res)=>{
    try {
        const result  = await pool.query("SELECT * FROM peso WHERE id = ?",[id]);
        if(!result.length){
            return res.status(404).json({msg:"No se encontró el registro"})
        }else{
            res.status(200).json(result[0])
            }
    } catch (error) {
        console.log(error);
    }
}

export const createPeso =async (req,res) =>{
    try {
        const {peso}= req.body;
        const result = await pool.query("insert into peso (peso_promedio) VALUES (?);",[peso]);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updatePeso  = async (req,res) =>{
    const {id} = req.params;
    const {peso} = req.body;
    
    try {
        const result = await pool.query("update peso set peso=? where id=?", [peso,id]);
        
        if(result.affectedRows>0){
           res.status(200).json({msg:`Se actualizó correctamente el peso del usuario ${id}`});    
        } else {
           res.status(404).json({msg:`No se encontró el usuario con la ID "${id}"`});    
        }
    } catch (error) {
       console.log(error);
       res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const deletePeso = async(req,res) =>{
    const {id} = req.params;
    try {
        console.log('solicitud de eliminacion' , id);
        const pesoExist = await pool.query('SELECT * FROM  peso WHERE id= ?',[id]);
        if (pesoExist.length === 0 ) {
            return res.status(404).send('El peso no existe');
        }
        console.log('ID del peso a eliminar', id);
        console.log('peso eliminado');
        const resultado = await pool.query('DELETE FROM peso WHERE id= ?',[id]);
        if(resultado.affectedRows > 0 ) {
            res.status(200).json({msg:"Se eliminó correctamente"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("error en el servidor");
    }
}