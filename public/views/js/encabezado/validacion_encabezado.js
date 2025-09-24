import { completarCampo, justificarIzquierda } from './helpers.js';

export function validarFormularioEncabezado(event) {
    event.preventDefault();

    const botonPresionado = event.submitter.id;

    const get = (id) => document.getElementById(id)?.value.trim() || '';
    const getFormatted = (id, length, leftJustify = false) =>
        leftJustify ? justificarIzquierda(get(id), length) : completarCampo(get(id), length);

    const idEmpresa2 = get('idEmpresa2');
    const cuentaCargo = get('cuentaCargo');
    const user = get('user');
    const token = get('token');
    const idAccion = get('idAccion');
    const fechaProgramada = get('fechaProgramada');
    const fechaFormateada = get('fechaFormateada');

    const errores = [];

    if (!/^\d{1,9}$/.test(idEmpresa2)) errores.push("El ID de la empresa debe contener solo números (máximo 9 dígitos).");
    if (!/^\d{1,20}$/.test(cuentaCargo)) errores.push("La cuenta cargo debe contener solo números (máximo 20 dígitos).");
    if (user === "" || user.length > 20) errores.push("El campo 'User' no puede estar vacío y debe tener máximo 20 caracteres.");
    if (token === "" || token.length > 40) errores.push("El campo 'Token' no puede estar vacío y debe tener máximo 40 caracteres.");
    if (idAccion === "0" || idAccion === "") errores.push("Por favor, selecciona una opción válida en 'ID Acción'.");
    if (fechaProgramada.length > 16) errores.push("La fecha y hora no debe superar los 16 caracteres.");

    if (errores.length > 0) {
        alert(errores.join('\n'));
        return false;
    }

    const contenido =
        getFormatted('idEmpresa2', 9) +
        getFormatted('cuentaCargo', 20) +
        getFormatted('user', 20, true) +
        getFormatted('token', 40, true) +
        getFormatted('idAccion', 1, true) +
        justificarIzquierda(fechaFormateada, 16);

    localStorage.setItem("encabezadoGuardado", contenido);

    if (botonPresionado === "btnSiguiente") {
        window.location.href = "./menu.html";
    }

    return true;
}
