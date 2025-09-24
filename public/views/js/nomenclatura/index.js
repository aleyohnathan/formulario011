import { toggleMenu } from './menu.js';
import { formatearFecha } from './fecha.js';
import { validarFormularioNomenglatura } from './validacion.js';
import { actualizarVistaPreviaNombre } from './vistaPrevia.js';

window.toggleMenu = toggleMenu; // Para que funcione desde el botón HTML

document.addEventListener("DOMContentLoaded", () => {
    const inputIds = ["identificador", "idEmpresa", "identificador_del_servicio", "consecutivo"];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        input?.addEventListener("input", actualizarVistaPreviaNombre);
    });

    document.getElementById("fecha")?.addEventListener("change", formatearFecha);

    document.querySelector(".form-body")?.addEventListener("submit", validarFormularioNomenglatura);

    const scrollBtn = document.getElementById("goBottomBtn");
    scrollBtn?.addEventListener("click", () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });
});
