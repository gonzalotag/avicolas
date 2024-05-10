import {pool} from "../db.js"

export const getAllProduccion = async (req,res)=>{
    try {
        const [result]= await pool.query('SELECT * FROM produccion' );
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProduccionItem = async (req,res)=>{
    try {
        const [result] = await pool.query("select  * from produccion where id=?",[req.params.id]);
        if(!result.length){
            res.status(404).json({message:"No se encontró la producción  con el ID especificado."});
        }else{
            res.json(result[0]);
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
export const createProduccion = async (req,res)=>{
    const {subtablas}= req.body;
    if (!subtablas || !Array.isArray(subtablas)) {
        return res.status(400).json({message:"subtabla invalida"});
    }
    try {
        const result = await pool.query(
            "INSERT INTO produccion (subtablas) VALUES (?)",
            [JSON,stringify(subtablas)]
        );
        if (result.affectedRows >0) {
            return res.status(201).json({message:"produccion creada"});
        } else {
            return res.status(500).json({message:"erro al crear produccion"});
        }
    } catch (error) {
        console.error("error en el controlador");
    }
}

export const updateProduccion = async (req,res)=>{
    const {id} = req.params;
    const {subtablas} =req.body;
    try {
        if (!subtablas || Object.keys(subtablas).length === 0) {
            return res.status(400).json({message: "se requieren datos de subtablas"});
        }
        const query = 'UPDATE produccion SET ? WHERE id = ?';
        const values = [subtablas, id];
        const result = await  pool.query(query,values);
        if (result.affectedRows >0) {
            return res.status(200).json({message:"resgistro actualizado"});
        } else {
            return res.status(404).json({message:"no se encontro el registro de produccion"})
        }
    } catch (error) {
        console.error("error en el controlador", error);
        return res.status(500).json({message: error.message})
    }
}

export const deleteProduccion = async (req,res)=>{
    const { id }= req.params;
    try {
        const result = await pool.query("DELETE FROM produccion WHERE id = ? ",[id]);
        if (result .affectedRows>0) {
            return res.status(200).json({message: "elminado correctamente"});
        } else {
            return res.status(404).json({message: "no se encontro elemento a eliminar"});
        }
    } catch (error) {
        return res.status(500).json({message:"error eliminar elemento",error});
    }
}
