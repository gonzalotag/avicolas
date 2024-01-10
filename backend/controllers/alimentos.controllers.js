import { pool } from "../db.js";

export const getAlimentos = async(req,res)=>{
    try {
        const [result] = await pool.query(
            'SELECT * FROM alimento'
        );
        res.json(result)
    } catch (error) {
        console.log(error);
        return res.status (500).json({message: error.message})

    }
};

export const getAlimento = async(req,res)=>{
    const id= req.params.id;
    try{
        const alimento = await pool.query('SELECT * FROM alimento WHERE id= ?',[id]);
        if(!alimento.length)
        return res.status(404).json({message:'El Alimento no existe'});
    res.json(alimento[0])
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Error en el servidor'})
}
};

//controlador para insertar un nuevo alimento
export const createAlimento =async(req,res)=>{
    const {nombre,precio,stock,fecha_vencimiento}
    = req.body;
    //validacion de campos vacios
    if (!nombre || !precio||!stock||!fecha_vencimiento )
    return res.status(400).json({msg:"Faltan datos"})
//verificando si la fecha es valida
const dateNow = new Date();
if(new Date(fecha_vencimiento)<dateNow)
return res.status(400).json({msg:"La fecha de vencimiento debeser mayor a la actual"})
try{
    const resultado =await pool.query("INSERT INTO alimento SET ?",[{nombre, precio, stock, fecha_vencimiento, id_almac}]);
    const [results]=await pool.query("INSERT INTO `alimento` (`nombre`,`precio`,`stock`,`fecha_vencimiento`,`id_almacen`) VALUES(?,?,?,?,?)",[nombre,precio,stock,fecha_vencimiento,id_almacen]);res.json({msg:`Se agrego correctamente el alimento con el id${results.insertId}`})
        }catch(e){
            console.log(e);
            return res.status(500).json({msg: "Hubo un error enel servidor"})
            }
};
export const updateAlimento = async(req,res)=>{
    const{id}=req.params;
    const{nombre, descripcion}=req.body;
    const data={nombre,descripcion};
    let editado=false;
    for(const key in data){
        if(data[key]!=undefined){
            editado=true;
            data[key]=data[key].toString().trim()
        }
    }
    if (!editado) {
        return res.status(400).json({message:"No se ha modificado ningdato"});
    }
    try{
        const filasAfectadas=await pool.query('UPDATE alimento SET ? WHEREid=?',[data,id]);
        if(filasAfectadas.affectedRows==0)
        throw new Error("el alimento no existe")
        res.status(200).json(filasAfectadas);
        }catch(e){
            console.log(e);
        return res.status(500).json({message:"Error en el servidor"+ e.message})
        }
};

export const deleteAlimento = async (req,res)=>{
    const id=req.params.id;
    try{
        await pool.query('DELETE FROM `alimento` WHERE `id`=?AND NOT EXISTS(SELECT 1 FROM recetas WHERE `ingredientes`.`alimento_id`=`alimento`.`id`)',[id]);
        //si devuelve una fila afectada es que si hay receta
        //con ese alimento y por lo tanto no se puede borrar
        if(!(await pool.query('SELECT COUNT(*) FROM `ingredientes`WHERE `alimento id`=?', [id]))[0]['COUNT(*)']){
            const filasAfectadas= await pool.query('DELETE FROM recetas WHERE alimento=?', [id]);
            if(!filasAfectadas.affectedRows)
            throw err;
        const resultado= await pool.query('DELETE FROM alimento WHERE id=?RETURNING * ',[id])
        res.status(200).json(resultado.rows[0]);
        } 
    }catch(err){
        console.log(err);
        return res.status(500).json({ message:'Se ha producido un erroren el servidor: '+err})
        }
}



