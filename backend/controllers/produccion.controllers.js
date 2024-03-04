import {pool} from "../db.js"

export const getAllProduccion = async (req,res)=>{
    try {
        const {galpones,alimentos,pollos_de_engorde,medicina}=req.body;
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
    
    const {galpones, alimentos,medicina, pollos_de_engorde}  = req.body;
    
    if (!galpones || !alimentos||!pollos_de_engorde||!medicina ) {
        return res.status(400).json({ message: 'Faltan datos necesarios para crear una producción.' });
    } try { 
        const result= await pool.query(
            "INSERT INTO produccion(galpones, alimentos,medicina, pollos_de_engorde) VALUES (?,?,?,?,?) ",
            [galpones, alimentos,medicina, pollos_de_engorde]);
        if (result.affectedRows >0 ) {
            return res.status(201).json({message: 'Produccion creada'});
        } else {
            return res.status(500).json({message: 'Error al crear produccion'});
        }
    } catch (error) {
        console.error("Error en el controlador",error);
        return res.status(500).json({message:"Error interno del ervidor"})
    }
}

export const updateProduccion = async (req,res)=>{
    const {id} = req.params;
    const {galpones, alimentos,medicinas,pollos_de_engorde}= req.body
    try {
        if (!galpones || !alimentos || !medicinas || !pollos_de_engorde) {
            return res.status(400).json({message: "Todos los campos son obligatorios"});
        }
        const query = 'update produccion set ? where id=?';
        const values = [galpones,alimentos,medicinas,pollos_de_engorde]
        const result = await pool.query(query,values);
        if(result.affectedRows > 0){
            return res.status(200).json({message:'Registro actualizzado correctamente'});
        }else{
            return res.status(404).json({message:'No se encontro el registro de produccion'});
        }
    } catch (error) {
        console.error("error en el controlador ", error);
        return res.status(500).json({message: error.message})
    }
}

export const deleteProduccion = async (req,res)=>{
    const { id }= req.params;
    const data = await getProduccionItem(req,res);
    if (!data){
        return res.status(404).json({message:"No se ha encontrado el elemento a eliminar"})
    }
    try {
       data.destroy();
       res.status(200).json({message:"Elemento eliminado correctamente"});
    } catch (error) {
        console.error("Error en el controlador",error);
        res.status(500).json({message:"Error al eliminar el elemento"});
    }
}
