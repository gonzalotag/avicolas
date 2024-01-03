import"../assets/css/reportes.css"

function Reportes (){
    
    return<div className="reportes">
            <h2>reportes de personal</h2>
            <table id='tabla'>
                <thead>
                    <tr>
                        <th>Nombre completo</th>
                        <th>Cargo</th>
                        <th>Fecha ingreso</th>
                        <th>Fecha salida</th>
                    </tr>
                </thead>
            </table>
            <h2>reportes de almacen</h2>
            <table>
                <tr>
                    <th>Alimentos consumidos</th>
                    <th>Medicamentos suministrados</th>
                    <th>Galpones usados</th>
                </tr>
            </table>
            <h2>reportes de produccion</h2>
            <table>
                <tr>
                    <button>produccion</button>
                    <button>alimentos</button>
                    <button>medicinas</button>
                    <button>galpones</button>
                </tr>
            </table>
            <h2>informes de produccion</h2>
            <table>
                <tr>
                    <th>Informes de produccion</th>
                    <th>informes de alimentos</th>
                    <th>informes de medicamentos</th>
                    <th>informes de galpones</th>
                    <th>informes de empleados</th>
                </tr>
            </table>
    </div>
}
export default Reportes;