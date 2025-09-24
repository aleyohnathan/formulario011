export function actualizarVistaPreviaNombre() {
    const idEmpresa2 = document.getElementById('idEmpresa2').value.trim().padStart(9, '0');
    const cuentaCargo = document.getElementById('cuentaCargo').value.trim().padStart(20, '0');
    const user = document.getElementById('user').value.trim().padEnd(20, ' ');
    const token = document.getElementById('token').value.trim().padEnd(40, ' ');
    const idAccion = document.getElementById('idAccion').value.trim().padStart(1, '0');
    const fechaFormateada = document.getElementById('fechaFormateada').value.trim().padEnd(16, ' ');

    const nombreArchivo = idEmpresa2 + cuentaCargo + user + token + idAccion + fechaFormateada;

    document.getElementById('previewArchivo').textContent =
        nombreArchivo.trim() === '' ? 
        'Aquí se mostrará el diseño de la estructura de el encabezado del archivo' :
        nombreArchivo;
}
