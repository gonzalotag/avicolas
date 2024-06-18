import {pool} from "../db.js"

export const getAllGastos =  async (req,res) =>{
    try{
        const [result] = await pool.query('SELECT * FROM gastos')
        res.json(result);
    }catch(error){
        res.status(400).send("Error al obtener los gastos");
    }
}

export const getGasto = async (req,res) =>{
    try {   
        const {id} = req.params;            
        const [result] = await pool.query('SELECT * FROM gastos WHERE id=?',[id]);                
        if(!result.length) 
        return res.status(404).send("No existe el gasto con ese ID")                
        res.json(result[0]);
    } catch (error) {           
        res.status(500).send("Ocurrio un error en la base de datos")
    }
}

export const  createGasto = async (req,res)=>{        
    const {detalle , importe}=req.body      
    try {                
        const result = await pool.query("INSERT INTO gastos (detalle,importe) VALUES (?,?)", [detalle,importe]);    
        const nuevoGastoId = result.insertId    
        res.status(201).json({id: nuevoGastoId});
    } catch (error) {           
        res.status(500).send(`Hubo un error intentando crear el gasto ${importe}`);
    }
}
export const updateGasto = async (req,res) =>{
    const {id} = req.params;               
    const { detalle, importe } = req.body;               
    try {           
        const result = await pool.query('UPDATE gastos SET detalle= ?, importe= ? WHERE id=?', [detalle,importe,id] )
        if (result.affectedRows === 0 ) {
            res.status(404).json({message: 'no se encontroel gasto con el id proporcionado'})
        }else{
            res.status(200).json({message: 'gasto actualizado correctamemnte'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'erroren el servidor' + error.message});
        throw error;
    }
}

export const  deleteGasto = async (req,res) =>{    
    const {id} = req.params;
    try {            
        const existeGasto = await pool.query('SELECT * FROM gastos WHERE id=?', [id]);
        if (existeGasto.length === 0) {
            return res.status(404).send("No existe el gasto con ese ID");
        }
        const result = await pool.query('DELETE FROM gastos WHERE id=?', [id]);
        if (result.affectedRows ===0 ) {
            return res.status(404).send("no se ha eliminado el gasto");
        }
        return res.status(200).send("se elimino ") 
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
}