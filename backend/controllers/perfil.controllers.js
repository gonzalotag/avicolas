import { pool } from "../db.js";

export const getPerfiles = async(req, res) =>{
    try {
    const [result] = await pool.query(
        "SELECT * FROM perfil"
    );      
    res.json(result)

    } catch (error) {
        return res.status(500).json({message: error.message})    
    }
};
export const getPerfil = async (req,res) => {
    try {
        const[result] = await pool.query("SELECT * FROM perfil WHERE id= ?",[
            req.params.id]);
            if (result.length === 0) {
                return res.status(404).json({message:"perfil no found"});
            } else {
                res.json(result[0]);
            }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

