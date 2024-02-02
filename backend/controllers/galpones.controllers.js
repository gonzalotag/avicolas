import { pool } from "../db.js";

export const getAllGalpones =async (req,res)=>{
    try {
        const [result]=await pool.query("SELECT * FROM galpon");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({status:'fail',message:"Error interno del servidor"});
    }
}

export const getGalpon = async (req,res)=>{
    const id= req.params.id;
    if(!isNaN(parseInt(id))){
        const filtroId = parseInt(id);
        const [galpon] = await pool.query(`SELECT * FROM galpon WHERE id_galpon = ?`,[filtroId]);
        if (!galpon.length) {
            return res.status(404).json({ status: 'fail', message: 'Galpón no encontrado' });
            } else {
                res.status(200).json({status:'success',data: galpon[0]});
            }
        }else{
            res.status(400).json({status:'fail',message:'ID incorrecto'})
            }
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
    const datoActualizar=req.body;
    const filtroWhere =`WHERE id_galpon='${id}'`;
    const camposUpdate = Object.keys(datoActualizar).map((i,index)=>`${camposGalpon[index]} = '${datoActual.replace(/"/gi,"")}'`).join(",");
    const query = genQuery(datoActualizar,'UPDATE','galpon',filtroWhere);
    try {
        const resultado =await pool.execute(query);
        if (resultado.affectedRows) {
            res.status(200).json({
                status:'succes',
                message:`Se actualizaron ${resultado.changedRows} registros`,});
    } else {
            res.status(404).json({status:'fail',message:"No se encontró el Registro a Actualizar"});
            }
            }catch(e){
                console.log(e);
                res.status(500).json({status:'fail',message:'Error en la base de datos'});
            };
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



