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
        const result= await pool.query("insert into produccion(galpones, alimentos,medicina, pollos_de_engorde) values (?,?,?,?,?) ",[galpones, alimentos,medicina, pollos_de_engorde]);
    } catch (error) {
        console.error(error);
    }
}

export const updateProduccion = async (req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    let galpones, alimentos, medicina, pollos_de_engorde ;
    //revisa si hay cambios en los campos que se van a actualizar
    Object.keys(changes).forEach(key => {
        if ([ "galpones","alimentos","pollo_de_engorde","medicina"].includes(key)) {
            eval(`${key}=changes.${key}`);
        }
    })
    const data =await getProduccionItem(req,res);
    if (data.galpones != galpones) {
        const galponValidate = await validateGalpon(galpones);
        if (galponValidate.valid) {
            changes.galpones = galpones;
        } else {
            return res.status(400).json({ message: `El Galpón ${galpones} no existe.` });
        }
    }
    if (data) {
        data.update(changes).then(()=>{
            res.status(201).json(data);
        }).catch((err)=> {
            console.log(err);
            res.status(500).json({ message: 'Error al actualizar la producción.' });
        });
    }else{
        res.status(404).json({message:'No se encontró el item de producción'});
    }
}
export const deleteProduccion = async (req,res)=>{}
export const getProduccionbyParams = async (req,res)=>{}
