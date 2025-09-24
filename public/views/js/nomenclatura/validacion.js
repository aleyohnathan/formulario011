import { completarCampo } from './helpers.js';
import { actualizarVistaPreviaNombre } from './vistaPrevia.js';
import { guardarIdEmpresa } from './menu.js';

export function validarFormularioNomenglatura(event) {
    event.preventDefault();

    const botonPresionado = event.submitter.id;

    const campos = [
        { id: 'identificador', maxLength: 2, nombre: 'El identificador' },
        { id: 'idEmpresa', maxLength: 9, nombre: 'El ID Empresa' },
        { id: 'identificador_del_servicio', maxLength: 2, nombre: 'El identificador de servicio' },
        { id: 'consecutivo', maxLength: 4, nombre: 'El consecutivo' }
    ];

    const soloNumeros = /^[0-9]+$/;
    const valores = {};

    for (const campo of campos) {
        const valor = document.getElementById(campo.id).value.trim();
        if (!valor || !soloNumeros.test(valor) || valor.length > campo.maxLength) {
            alert(`${campo.nombre} debe tener máximo ${campo.maxLength} dígitos numéricos.`);
            return false;
        }
        valores[campo.id] = valor;
    }

    const fecha = document.getElementById('fecha').value.trim();
    if (!fecha) {
        alert("Por favor, completa el campo Fecha.");
        return false;
    }

    const fechaFormateada = document.getElementById('fechaFormateada').value.trim();
    const nombreArchivo =
        completarCampo(valores['identificador'], 2) +
        completarCampo(valores['idEmpresa'], 9) +
        (fechaFormateada ? fechaFormateada + '_' : '') +
        completarCampo(valores['identificador_del_servicio'], 2) +
        valores['consecutivo'].padStart(4, '0');

    document.getElementById("previewArchivo").textContent = nombreArchivo + ".txt";
    localStorage.setItem("NomenglaturaArchivo", nombreArchivo);

    if (botonPresionado === "btnSiguiente") {
        guardarIdEmpresa();
        window.location.href = "./encabezado.html";
    }

    return true;
}
