import { pool } from "../db.js";

export const getAlmacenes = async (req,res)=>{
    try {
        const result = await pool.query(
            "SELECT * FROM almacen"
        );
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

export const getAlmacen = async (req,res)=>{
    try {
        const id_almacen= req.params.id;
        const result = await pool.query("SELECT * FROM almacen WHERE id_almacen= ?",[id_almacen]);
        if(result.length == 0){
            return res.status(404).json({message:"No se encontró el almacén con ese ID."});
            }else{
                res.json(result[0])
                }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

