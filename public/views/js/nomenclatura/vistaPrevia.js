import { completarCampo } from './helpers.js';

export function actualizarVistaPreviaNombre() {
    const campos = [
        { id: 'identificador', length: 2 },
        { id: 'idEmpresa', length: 9 },
        { id: 'fechaFormateada', optional: true },
        { id: 'identificador_del_servicio', length: 2 },
        { id: 'consecutivo', length: 4 }
    ];

    const partes = campos.map(({ id, length, optional }) => {
        const valor = document.getElementById(id)?.value.trim();
        if (optional) return valor ? valor + '_' : '';
        return valor.padStart(length, '0') + '_';
    });

    const nombreArchivo = partes.join('').slice(0, -1);
    const esNombreVacio = nombreArchivo.replace(/_/g, '') === '';

    document.getElementById('previewArchivo').textContent = 
        esNombreVacio ? 'Aquí se mostrará el nombre del archivo.txt' : nombreArchivo + '.txt';
}
