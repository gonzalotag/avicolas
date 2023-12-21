import { pool } from "../db.js";

export const getPerfiles = async(req, res) =>{
    try {
    const [result] = await pool.query(
        "SELECT * FROM perfil"
    );      
    res.json(result)
        console.log(result)
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
// permite crear un nuevo perfil cubrinedo todas las bases y condiciones 
// como en el campo esta rol y contrasenia
export const createPerfil = async (req, res) => {
    try {
        const{
            nombre, 
            apellido_paterno, 
            apellido_materno , 
            direccion , 
            telefono, 
            email, 
            estado ,
            rol,
            contrasenia
            } = req.body;
            //para obtener el id del rol q se seleccione
            const [rolResult] = await pool.query("SELECT id FROM rol WHERE tipo =?", [rol]);
            const id_rol = rolResult[0].id;
            
// convierte el valor de estado a un entero (1 para true y 0 para false)
        const estadoInt = estado === true ? 1 : 0;
        const[result] = await pool.query(
            "INSERT INTO perfil (nombre, apellido_paterno, apellido_materno , direccion , telefono, email, estado ,id_rol,contrasenia) values (?,?,?,?,?,?,?,?,?)",
            [nombre, apellido_paterno, apellido_materno , direccion , telefono, email, estadoInt ,id_rol, contrasenia]
            );

        res.json({
            id: result.insertId,
            nombre,
            apellido_paterno, 
            apellido_materno , 
            direccion , 
            telefono, 
            email, 
            estado ,
            id_rol,
            contrasenia
        });
    } catch (error) {
        console.error('error al insertar en la base de datos',error )
        return res.status(500).json({message: 'error interno del servidor',error: error.message});
    }
};

export const updatePerfil = async (req,res) =>{
    try {
        //extrae los datos del cuerpo de la solicitud request body
        const {
            id,
            nombre,
            apellido_paterno,
            apellido_materno,
            direccion,
            telefono,
            email,
            
        }= req.body;
        //se realiza la consulta sql para actualizar el perfil en la BD
        const [result] =await pool.query (
            "UPDATE perfil SET nombre=?, apellido_paterno=?, apellido_materno=?, direccion=?, telefono=?, email=? WHERE id = ?",
            [
            nombre,
            apellido_paterno,
            apellido_materno,
            direccion,
            telefono,
            email,
            id,
            ]
        );
        console.log('Datos a actualizar',req.body);
        //responde los resultados en formato json
        res.json(result);
    } catch (error) {
        console.error('Error en le controlador ',error);
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

 export const getUserByParams = async (req,res) =>{
    try {
        const{nombre,contrasenia} = req.body;
        const [result] = await pool.query("select * from perfil where nombre = ? and contrasenia = ? " ,
        [
            nombre,
            contrasenia
        ]);

    // console.log(result);
    res.json({
        result
    })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
 }
 export const getPerfilesByRol = async (req,res) =>{
    try {
        const [rol]= req.params.id_rol
        // return res.status(404).json({rol});
        const[result]= await pool.query("select * from perfil where id_rol = ? ",
        [
            rol,
        ])
        if (result.length === 0) {
            return res.status(404).json({message:"perfil no found"});
        } else {
            res.json(result);
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
 }
//funcion getPerfilesById
// export const getPerfilesById = async (req,res)=>{
//     const id= req.params.id;
//     const [result]=await getPerfilesByRol(req,res);
//     const perfil=result.find((perfil)=>perfil.id===parseInt(id));
//     if(!perfil){
//         return res.status(404).json({message:'No se encontro el Perfil'})
//         }else{
//             return res.json(perfil);
//             }
// };