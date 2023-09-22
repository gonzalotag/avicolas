import { pool } from "../db.js";

export const getUsuarios = async(req, res) =>{
    try {
    const [result] = await pool.query(
        "SELECT * FROM usuario"
    );      
    res.json(result)

    } catch (error) {
        return res.status(500).json({message: error.message})    
    }

};