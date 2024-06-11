import {pool} from "../db.js"

export const getAllProduccion = async (req,res)=>{
    try {
        const [results]= await pool.query('SELECT * FROM produccion' );
        const producciones = results.map(produccion => ({
                id:produccion.id,
                id_alimento:produccion.id_alimento,
                id_galpon:produccion.id_galpon,
                id_medicina:produccion.id_medicina,
                id_perfil:produccion.id_perfil,
                id_lote:produccion.id_lote,
                id_mortalidad:produccion.id_mortalidad,
                id_gastos:produccion.id_gastos,
                id_peso:produccion.id_peso,                
        }));
        res.json(producciones);
    } catch (error) {
        console.error('error fetchign produccion data:', error);
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
            const alimento = await getRelatedData(produccion.id_alimento,'alimento');
            const galpon = await getRelatedData(produccion.id_galpon,'galpones');
            const medicina = await getRelatedData(produccion.id_medicinas,'medicinas');
            const perfil = await getRelatedData(produccion.id_perfil,'perfiles');
            const lote = await getRelatedData(produccion.id_lotes,'lote');
            const mortalidad = await getRelatedData(produccion.id_mortalidad,'mortalidad');
            const gasto = await getRelatedData(produccion.id_gastos,'gastos');
            const peso = await getRelatedData(produccion.id_peso,'peso');
            res.json ({
                id:produccion.id,
                alimento,
                galpon,
                medicina,
                perfil,
                lote,
                mortalidad,
                gasto,
                peso,
            })
        }
    } catch (error) {
        console.error(`error fetching produccion item with id ${req.param.id}`, error);
        return res.status(500).json({message: error.message});
    }
}

export const createProduccion = async (req,res)=>{
    const {subtablas}= req.body;
    if (!subtablas || typeof subtablas !== 'object') {
        return res.status(400).json({message:"subtabla invalida"});
    }
    try {
        const getFirstId = (array) => (array.length > 0 ? array[0].id :null);
            const id_alimento= getFirstId(subtablas.alimentacion);
            const id_galpon =getFirstId(subtablas.galpon);
            const id_medicina =getFirstId(subtablas.medicaciones);
            const id_perfil =getFirstId(subtablas.empleado);
            const id_lote =getFirstId(subtablas.lote);
            const id_mortalidad =getFirstId(subtablas.mortalidad);
            const id_gastos =getFirstId(subtablas.gastos);
            const id_peso =getFirstId(subtablas.peso);
        
        const query = "insert into produccion (id_alimento,id_galpon,id_medicina,id_perfil,id_lote,id_mortalidad,id_gastos,id_peso) values (?,?,?,?,?,?,?,?)";
        const values = [id_alimento,id_galpon,id_medicina,id_perfil,id_lote,id_mortalidad,id_gastos,id_peso];
        
        console.log("excuting query", query, values);
        const [result] = await pool.query(query , values);
        if (result.affectedRows > 0) {
            return res.status(201).json({message: "produccion creada"});
        } else {
            return res.status(500).json({message:"error al crear produccion"});
        }
    } catch (error) {
        console.error("error en el controlador", error);
        return res.status(500).json({message:"error en el controlador" , error: error.message});
    }
    
}

export const updateProduccion = async (req,res)=>{
    const {id} = req.params;
    const {subtablas} =req.body;
    if (!subtablas || typeof subtablas !== 'object' || Object.keys(subtablas).length === 0) {
        return res.status(400).json({message: "se requieren datos de subtablas"});
    }
    try {
        const result = await  pool.query('UPDATE produccion set subtablas = ? WHERE id = ?',[JSON.stringify(subtablas),id]);
        if (result.affectedRows >0) {
            return res.status(200).json({message:"resgistro actualizado"});
        } else {
            return res.status(404).json({message:"no se encontro el registro de produccion"})
        }
    } catch (error) {
        console.error("error en el controlador update", error);
        return res.status(500).json({message: error.message})
    }
}

export const deleteProduccion = async (req,res)=>{
    const { id }= req.params;
    try {
        const [rows] = await pool.query("select * from produccion where id= ?",[id]);
        if (rows.length === 0) {
            console.log(`produccion con id ${id} no encontrada para eliminar `);
            return res.status(404).json({message: "no se encontro elemento a eliminar"});
        }
        const [result]= await pool.query("delete from produccion where id =?",[id]);
        if (result.affectedRows >0) {
            console.log(`produccion con id ${id} eliminada correctamente`);
            return res.status(200).json({message:"eliminado correctamente"});
        } else {
            console.log(`produccion con id ${id} no eliminada`);
            return res.status(404).json({message:"no se encontro elemento a eliminar"});
        }
    } catch (error) {
        console.error("error al eliminar elemento", error);
        return res.status(500).json({message: "error al eliminar elemento", error});
    }
    
}