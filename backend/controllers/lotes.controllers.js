import { pool } from "../db.js";

export const getAllLotes = async(req,res) =>{
    try {
        const [result]= await pool.query("select * from lote");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:" erro al obtener los lote"});
    }
}

export const getLote = async(req,res)=>{
    try {
        const {id}= req.params;
        const result=await pool.query('SELECT * FROM lote WHERE id=?',[id]);
        if (result.rowCount>0){
            res.status(200).json({
                status:'succes',
                data:result.rows[0]
                })
        }else{
            res.status(404).json({
            status:'fail',
            message:'No se encontro el lote'
            })
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({status:'server error',message:'Error internal del servidor'})
    }
}

export const createLote =async(req,res)=>{
    try{
    const {raza,cantidad,valor_unidad}=req.body;
    //validar que no esten vacios
    if(!raza || !cantidad ||!valor_unidad ){
        return res.status(400).json({
            status:'fail',
            message:'Faltan datos necesarios para crear un lote'
        })
    }
    const result=await pool.query(
        "INSERT INTO LOTE (raza, cantidad, valor_unidad) VALUES (?,?,?);",
        [raza, cantidad, valor_unidad]
        );
        res.status(201).json ({
            status : 'succes',
            message : 'Se ha creado el lote correctamente',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            status:'server error',
            message:'Error interno del servidor',
            error:error
            });
    }
}

export const updateLote = async(req,res)=>{
    const {id} = req.params;
    const {raza,cantidad,valor_unidad}=req.body;
        try{
            const result = await pool.query(
                "UPDATE LOTE SET raza=$2, cantidad=$3, valor_undad=$4 WHERE id=${id} RETURNING *",
                [id,raza,cantidad,valor_unidad,id]);
                if(result.rowCount<=0){
                    return res.status(404).json({
                        status:'not found',
                        message:`No se encontró el lote con id ${id}`
                    })
                }
                    res.status(200).json({
                    status:'succes',
                    message:'Se actualizaron los datos del lote',
                    data:rowUpdated.rows[0]
                    })
                } catch(e){
                // console.log(e);
                res.status(500).json({
                status:'error',
                message:'Server Error'
                })
            }                                   
}

export const deleteLote=async (req,res) =>{
    const {id} = req.params;
    try {
        const result = await pool.query('delete from lote where id = ?',[id]);
        if (result.afectedRows>0) {
            console.log('lote con ${id} eliminado con exito', result);
        } else {
            console.log('no se encontro ningun con  este id ${id}');
            return result;
        }
        console.log('res del server', res);
    }catch{
        return res.status(400).send({message:"Error interno del servidor"});
    }
}