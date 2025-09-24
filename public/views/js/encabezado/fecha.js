import { actualizarVistaPreviaNombre } from './vistaPrevia.js';

export function formatearFecha() {
    const fechaInput = document.getElementById("fechaProgramada").value;

    if (fechaInput) {
        const [fechaPart, horaPart] = fechaInput.split("T");
        if (!fechaPart || !horaPart) return;

        const [anio, mes, dia] = fechaPart.split("-");
        const [horas, minutos] = horaPart.split(":");
        const formato = `${dia}-${mes}-${anio} ${horas}:${minutos}`;

        document.getElementById("fechaFormateada").value = formato;
        actualizarVistaPreviaNombre();
    } else {
        document.getElementById("fechaFormateada").value = "";
        document.getElementById("previewArchivo").textContent =
            "Aquí se mostrará el diseño de la estructura de el encabezado del archivo";
    }
}
