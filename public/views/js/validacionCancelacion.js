let registros = [];
let registroSeleccionadoIndex = null;

function seleccionarRegistro(index) {
    registroSeleccionadoIndex = index;
    document.querySelectorAll('.registro-item').forEach(item => item.classList.remove('selected'));
    const items = document.querySelectorAll('.registro-item');
    if (items[index]) {
        items[index].classList.add('selected');
    }
}

function justificarIzquierda(valor, longitud) {
    valor = valor.toString();
    return valor.length < longitud ? valor.padEnd(longitud, ' ') : valor.substring(0, longitud);
}

function justificarDerecha(valor, longitud) {
    valor = valor.toString();
    return valor.length < longitud ? valor.padStart(longitud, ' ') : valor.slice(-longitud);
}

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}

function actualizarVistaPreviaRegistros() {
    const preview = document.getElementById('previewArchivo');
    preview.innerHTML = ''; // Limpia la lista

    if (registros.length === 0) {
        preview.innerHTML = '<li>Aquí se mostrará el diseño de la estructura del archivo</li>';
    } else {
        registros.forEach((registro, index) => {
            const li = document.createElement('li');
            li.textContent = registro;
            li.dataset.index = index;
            li.classList.add('registro-item');
            li.addEventListener('click', () => seleccionarRegistro(index));
            preview.appendChild(li);
        });
    }
}

function agregarRegistro() {
    const referenciaInput = document.getElementById('referencia');
    const nombreInput = document.getElementById('nombre');
    const referencia = referenciaInput.value.trim();
    const nombre = nombreInput.value.trim();

    if (registros.length === 0) {
        if (referencia === "" || nombre === "") {
            alert("Por favor, completa ambos campos.");
            return;
        }
        if (referencia.length > 35) {
            alert("La referencia no debe tener más de 35 caracteres.");
            return;
        }
              if (nombre.length > 60) {
            alert("La nombre no debe tener más de 60 caracteres.");
            return;
        }

        referenciaInput.removeAttribute("required");
        nombreInput.removeAttribute("required");
    }

    const justRef = justificarDerecha(referencia, 35);
    const justNom = justificarDerecha(nombre, 60);
    const registro = justRef + justNom;

    registros.push(registro);

    referenciaInput.value = "";
    nombreInput.value = "";

    actualizarVistaPreviaRegistros();
}


let salirConfirmado = false; // variable global para controlar el beforeunload

function validarFormularioCancelacion(event, formato) {
  if (event) event.preventDefault();

  // Ya no intentes agregar aquí
  if (registros.length === 0) {
    alert("No hay registros para guardar.");
    return false;
  }

  const encabezadoGuardado = localStorage.getItem("encabezadoGuardado") || "";
  const NomenglaturaArchivo = localStorage.getItem("NomenglaturaArchivo") || "archivo";

  if (formato === "txt") {
    const contenido = encabezadoGuardado + '\n' + registros.join('\n');

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = `CL_${NomenglaturaArchivo}.txt`;
    enlaceDescarga.click();
    URL.revokeObjectURL(url);
    document.getElementById("formato_descarga_cancelacion").selectedIndex = 0;

  } else if (formato === "excel") {
    const filas = registros.map(reg => {
      const referencia = reg.substring(0, 35).trim();
      const nombre = reg.substring(35).trim();
      return [referencia, nombre];
    });

    const hoja = XLSX.utils.aoa_to_sheet(filas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Cancelaciones");
    XLSX.writeFile(libro, `CL_${NomenglaturaArchivo}.xlsx`);
    document.getElementById("formato_descarga_cancelacion").selectedIndex = 0;
  }

  // Confirmación para abandonar la página
  const quiereAbandonar = confirm("¿Deseas abandonar la página? Si no, permanecerás aquí.");
  if (!quiereAbandonar) return false;

  salirConfirmado = true;
  registros = [];
  actualizarVistaPreviaRegistros();
  window.location.href = "../../index.html";
  return true;
}



document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn_Nuevo_registro").addEventListener("click", agregarRegistro);
  

document.getElementById("formato_descarga_cancelacion").addEventListener("change", (event) => {
  const formato = event.target.value;

  if (registros.length === 0) {
    alert("Primero guarda al menos un registro antes de descargar.");
    event.target.value = ""; // resetea el select
    return;
  }

  validarFormularioCancelacion(null, formato);
});

  ["referencia", "nombre"].forEach(id => {
    document.getElementById(id).addEventListener("input", actualizarVistaPreviaRegistros);
  });
});
window.addEventListener('beforeunload', function (e) {
  if (!salirConfirmado) {
    e.preventDefault();
    e.returnValue = '';
  }
});