import {pool} from "../db.js";

export const getAllMortalidad = async(req,res)=>{
    try {
        const [result] = await pool.query('select * from mortalidad');
        res.json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getMortalidad = (req,res) =>{
    const {id}= req.params;try {
        const [fila] = pool.query(`select * from mortalidad where id=${id}`);
        if (fila.length >0) {
            res.status(200).json(fila[0])
        } else {
            res.status(200).json({message: "no hay ese registro de mortalidad"});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Error al buscar la mortalidad'});
    }
}
export const createMortalidad =async(req,res)=>{
    const{cantidad,causa,descripcion}= req.body;
    if(!cantidad || !causa ||!descripcion){
        return res.status(400).json({message:"Faltan datos"})
    }
    try {
        const result=await pool.query("INSERT INTO mortalidad (cantidad, causa,descripcion)VALUES (?,?,?)",[cantidad,causa,descripcion]);
        console.log("mortalidad creada con exito", result.insertId);
        res.status(201).json({id: result.insertId,cantidad,causa,descripcion});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error en el servidor', error:error.message});
    }
};

/*
Se utiliza para actualizar los campos de una muerte en especifico
*/
export const updateMortalidad = async (req,res) => {
    const params=req.body;
    const {id}=req.params;
    try {
        const result=await pool.query("UPDATE mortalidad SET ? WHERE id_mortalidad=?",[params,id]);
        return  res.status(200).json(result);
        
    } catch (error) {
        return res.status(500).json({message:'Error al editar la mortalidad'});
    }
    
};

//Eliminar un registro de muerte por su ID
export const deleteMortalidad = async (req,res) => {
    
    try{
        const result =await pool.query('DELETE FROM mortalidad WHERE id=?', [req.params.id]);
        console.log("mortalidad borrada",result.data);
        return res.status (200).json(result);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      }
};  