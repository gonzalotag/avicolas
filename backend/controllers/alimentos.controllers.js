import { pool } from "../db.js";

export const getAlimentos = async(req,res)=>{
    try {
        const [result] = await pool.query('SELECT * FROM alimento');
        res.json(result)
    } catch (error) {
        console.log(error);
        return res.status (500).json({message:"error interno server"})
    }
};

export const getAlimento = async(req,res)=>{
    
    try{
        const [alimento] = await pool.query('SELECT * FROM alimento WHERE id= ?',[req.params.id]);
        if(!alimento.length)
        return res.status(404).json({message:'El Alimento no existe'});
        res.json(alimento[0])
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Error en el servidor'})
}
};

export const createAlimento =async(req,res)=>{
    const {nombre,precio,cantidad,tipo,cantidad_sacos}= req.body;
    
    if (!nombre || !precio|| !cantidad|| !tipo|| !cantidad_sacos )
    return res.status(400).json({msg:"Faltan datos"})
    try{
        const query ="INSERT INTO alimento (nombre,precio,cantidad,tipo,cantidad_sacos) VALUES (?, ?, ?, ?, ?)";
        const value = [nombre,precio,cantidad,tipo,cantidad_sacos]
        const [result]=await pool.query(query, value);
        res.json({msg:`Se agrego correctamente el alimento con el id${result.insertId}`})
    }catch(error){
        console.error(error);
        return res.status(500).json({msg: "Hubo un error en el servidor"})
    }
};

export const updateAlimento = async(req,res)=>{
    const{id}=req.params;
    const{nombre,precio,cantidad,cantidad_sacos,tipo}=req.body;
    const data={nombre,precio,cantidad,cantidad_sacos,tipo};
    let editado=false;
    for(const key in data){
        if(data[key] !== undefined){
            editado=true;
            data[key]=data[key].toString().trim()
        }
    }
    if (!editado) {
        return res.status(400).json({message:"No se ha modificado ningun dato"});
    }
    try{
        const [rows]= await pool.query('UPDATE alimento SET ? WHERE id=?',[data,id]);
        if(rows.affectedRows === 0){
            throw new Error("el alimento no existe")
        }
        res.status(200).json({message: 'aliemnto actualizado correctamente'});
        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Error en el servidor"+ error.message})
        }
};

export const deleteAlimento = async (req,res)=>{
    try{
        const result = await pool.query('DELETE FROM `alimento` WHERE `id`=?',[req.params.id]);
            if(result.affectedRows === 0)
            throw error;
    }catch(err){
        console.log(err);
        return res.status(500).json({ message:'Se ha producido un erroren el servidor: ',err})
        }
}
