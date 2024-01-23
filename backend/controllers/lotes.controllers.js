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
        const result=await pool.query("SELECT * FROM LOTE WHERE ID=$1",[parseInt(id)]);
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
                "UPDATE LOTE SET raza=$2, cantidad=$3, valor_undad=$4 WHERE id=$1 RETURNING *",
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
                console.log(e);
                res.status(500).json({
                status:'error',
                message:'Server Error'
                })
            }                                   
}

export const deleteLote=async (req,res) =>{
    const {id} = req.params;
    try{
        const result =await pool.query('DELETE FROM Lote WHERE id=$1 RETURNING',[id]);
    if(!result || !result.rowCount){
        return  res.status(404).json({
        status : 'not found',
        message : `El lote con id "${id}" no fue encontrado`});
    }else{
        res.status(200).json({
        status : 'sucess',
        message : "Se elimino correctamente",
        data : result.rows
        });
    };
    }catch(e){
        console.log(e);
        res.status(500).json({
        status : 'Error Interno del servidor',
        error : e
        })
    }
}