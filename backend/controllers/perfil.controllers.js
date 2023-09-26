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
export const createPerfil = async (req, res) => {
    try {
        
        const{nombre, apellido_paterno, apellido_materno , direccion , telefono, email, estado ,id_rol} = req.body;
        const[result] = await pool.query(
            "INSERT INTO perfil (nombre, apellido_paterno, apellido_materno , direccion , telefono, email, estado ,id_rol) values (?,?,?,?,?,?,?,?)",
            [nombre, apellido_paterno, apellido_materno , direccion , telefono, email, estado ,id_rol]
        );
        /*console.log (result); */
        res.json({
            id: result.insertId,
            nombre, apellido_paterno, apellido_materno , direccion , telefono, email, estado ,id_rol
        })
    } catch (error) {
        return res.status(500).json({message: error.message});    
    }
};

 export const updatePerfil = async (req,res) =>{
    try {
        const result =await pool.query ("UPDATE perfil SET ? WHERE id = ?",[
            req.body,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
 };

 export const deletePerfil = async (req,res) =>{
    try {
        const [result] = await pool.query("DELETE FROM perfil WHERE id = ?",[
            req.params.id,
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).json ({ message : "tarea no encontrada" });
        } else {
            return res.sendStatus(204);
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
 };

 