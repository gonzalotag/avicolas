import"../assets/css/reportes.css"

function Reportes (){
    
    return<div className="reportes">
            <h2>reportes de personal</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre completo</th>
                        <th>Cargo</th>
                        <th>Fecha ingreso</th>
                        <th>Fecha salida</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <div>
            <h2>reportes de almacen</h2>
            <table>
                <thead>
                <tr>
                    <th>Alimentos consumidos</th>
                    <th>Medicamentos suministrados</th>
                    <th>Galpones usados</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            </div>
            <div>
            <h2>reportes de produccion</h2>
            <table>
                <thead>
                <tr>
                    <th>produccion</th>
                    <th>alimentos</th>
                    <th>medicinas</th>
                    <th>galpones</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            
            </div>
            <h2>informes de produccion</h2>
            <table>
                <thead>
                <tr>
                    <th>Informes de produccion</th>
                    <th>informes de alimentos</th>
                    <th>informes de medicamentos</th>
                    <th>informes de galpones</th>
                    <th>informes de empleados</th>
                </tr>
                </thead>    
                <tbody>

                </tbody>
            </table>
    </div>
}
export default Reportes;