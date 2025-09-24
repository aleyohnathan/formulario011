import { actualizarVistaPreviaNombre } from './vistaPrevia.js';

export function formatearFecha() {
    const fecha = document.getElementById("fecha").value;
    if (fecha) {
        const partes = fecha.split("-");
        const formato = partes[0] + partes[1] + partes[2]; // yyyyMMdd
        document.getElementById("fechaFormateada").value = formato;
        actualizarVistaPreviaNombre();
    }
}
