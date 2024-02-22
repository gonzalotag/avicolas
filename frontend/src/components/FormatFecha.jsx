export const FormatFecha = (fecha) => {
    const options = {day:'2-digit',month:'2-digit',year:'numeric'}
    const formatoFecha = new Date(fecha).toLocaleDateString(undefined,options);
    return formatoFecha;
}