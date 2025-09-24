import { toggleMenu, mostrarIdEmpresa } from './menu.js';
import { formatearFecha } from './fecha.js';
import { validarFormularioEncabezado } from './validacion_encabezado.js';
import { actualizarVistaPreviaNombre } from './vistaPrevia.js';

window.toggleMenu = toggleMenu;

document.addEventListener("DOMContentLoaded", () => {
    mostrarIdEmpresa();

    const camposActualizar = ["idEmpresa2", "cuentaCargo", "user", "token", "idAccion", "fechaProgramada"];

    camposActualizar.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener("input", actualizarVistaPreviaNombre);
        }
    });

    const campoFecha = document.getElementById("fechaProgramada");
    if (campoFecha) {
        campoFecha.addEventListener("change", formatearFecha);
    }

    const formulario = document.querySelector(".form-body");
    if (formulario) {
        formulario.addEventListener("submit", validarFormularioEncabezado);
    }

    const btnScroll = document.getElementById("goBottomBtn");
    if (btnScroll) {
        btnScroll.addEventListener("click", () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        });
    }
});
