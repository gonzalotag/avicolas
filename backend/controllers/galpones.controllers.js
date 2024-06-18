import { pool } from "../db.js";

export const getAllGalpones =async (req,res)=>{
    try {
        const [result]=await pool.query("SELECT * FROM galpon");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({status:'fail',message:"Error interno del servidor"});
    }
};

export const getGalpon = async (req,res) =>{
    const id= req.params.id;
    if (!isNaN(parseInt(id))) {
        const filtroId=parseInt(id);
        const [galpon] = await pool.query('SELECT * FROM galpon WHERE  id=?',[filtroId]);
    }
    // try {
        
        if (!galpon.length){

            return res.status(404).json({status:'fail', message:'galpon no encontrado'});
        }else{
        res.json(galpon [0]);
    }
    // } catch (error) {
        // console.log(error);
        res.status(400).json({ status: 'fail', message: 'El id debe ser un numero' });
    // }
};

export const createGalpon =async(req,res)=>{
    const {num_galpon, capacidad, disponible }= req.body
    const query = 'INSERT INTO galpon (num_galpon,capacidad , disponible) VALUES (?,?,?)';
    try {
        const [result] = await pool.execute(query, [num_galpon, capacidad, disponible]);
        res.status(201).json({
            status: 'succes',
            data:{...req.body, id: result.insertId},
        });
    }catch(error){
        console.error("error en create galpon ",error);
        res.status(500).json({status: 'fail' , message:'error al crear el galpon '});
    }
};

export const updateGalpon = async (req,res)=>{
    const {id}=req.params;
    const {num_galpon,capacidad, disponible } = req.body;
    try {
        const result = await pool.query(
            "update galpon set num_galpon =? , capacidad =? , disponible = ? where id = ?",
            [num_galpon , capacidad , disponible, id]
        );
        if (result.affectedRows ===0) {
            return res.status(404).json({status: 'no encontrado', message:'no se encontro el galpon '})
        }
        return res.status(200).json({status: 'actualizado', message:'se actualizaron los datos de galpon '})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 'error', message:'error en el servidor'})
    }
};

export const deleteGalpon = async(req,res)=>{
     
    try {
        const resultado =await pool.query('DELETE FROM galpon WHERE id=?',[req.params.id]); 
        if (!resultado.length) {
            return res.status(404).json({status:'fail',message:'No se ha eliminado el Galpon'})
          }else{
            res.status(200).json({status:'succes',message:'El Galpon fue Eliminado Correctamente'})
          }
    } catch (error) {
    console.log(error);
    res.status(500).json({status:'fail',message: 'Error eliminando el Registro'})
    }
};
