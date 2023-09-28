import { pool } from "../db.js";

export const getRol = async (req,res) => {
    try {
        const[result] = await pool.query("select tipo from rol where id =?",[
        req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({message:"rol no found"});    
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        return res.status(500).json({message:error.message});        
    }
}

