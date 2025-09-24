

let registros = [];
let registroSeleccionadoIndex = null;
let validarCampos = true;

function seleccionarRegistro(index) {
    registroSeleccionadoIndex = index;
    document.querySelectorAll('.registro-item').forEach(item => item.classList.remove('selected'));
    const items = document.querySelectorAll('.registro-item');
    if (items[index]) {
        items[index].classList.add('selected');
    }
}
   

function formatearFecha() {
    const fecha_de_vigencia = document.getElementById("fecha_de_vigencia").value;
    if (fecha_de_vigencia) {
        const partes = fecha_de_vigencia.split("-");
        const formato = partes[0] + partes[1] + partes[2];
        document.getElementById("fechaFormateada").value = formato;
        document.getElementById("fechaMostrada").textContent = formato;
      }
        // Esperar que el DOM esté cargado para enlazar eventos
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("fecha").addEventListener("change", formatearFecha);
        document.querySelector(".form-body").addEventListener("submit", validarFormularioNomenglatura);
      }); 
  } 

  function formatearFechaParaExcel(fechaStr) {
  if (fechaStr.length !== 8) return fechaStr;

  const año = fechaStr.substring(0, 4);
  const mes = fechaStr.substring(4, 6);
  const dia = fechaStr.substring(6, 8);

  return `${dia}/${mes}/${año}`;
}

  // Formatear campos numéricos a longitud fija
function completarCampo(valor, longitud) {
    return valor.padStart(longitud, '0');
        }
            
function justificarIzquierda(valor, longitud) {
    valor = valor.toString(); // Asegurarse de que es texto
            if (valor.length < longitud) {
                    valor = valor.padEnd(longitud, ' ');
                } else if (valor.length > longitud) {
                    valor = valor.substring(0, longitud); // cortar si es más largo
                }
                    return valor;
        }
function justificarDerecha(valor, longitud) {
    valor = valor.toString();
            if (valor.length < longitud) {
                    valor = valor.padStart(longitud, ' ');
                } else if (valor.length > longitud) {
                     valor = valor.slice(-longitud); // tomar los últimos caracteres
                }
                    return valor;
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
function insertarPuntoEnCentavos(importeStr) {
  if (importeStr.length !== 15) return importeStr; 
  const parteEntera = importeStr.slice(0, 12); 
  const centavos = importeStr.slice(13);       
  return parteEntera + '.' + centavos;         
}
function agregarRegistro() {
    const importeInput = document.getElementById('importe');
    const primer_apellidoInput = document.getElementById('primer_apellido');
    const segundo_apellidoInput = document.getElementById('segundo_apellido');
    const nombreInput = document.getElementById('nombre');
    const referenciaInput = document.getElementById('referencia');
    const Tipo_de_dentificacionInput = document.getElementById('Tipo_de_dentificacion');
    const celularInput = document.getElementById('celular');
    const correo_electronicoInput = document.getElementById('correo_electronico');


    const importe = importeInput.value.trim();
    const primer_apellido = primer_apellidoInput.value.trim();
    const segundo_apellido = segundo_apellidoInput.value.trim();
    const nombre = nombreInput.value.trim();
    const referencia = referenciaInput.value.trim();
    const Tipo_de_dentificacion = Tipo_de_dentificacionInput.value.trim();
    const celular = celularInput.value.trim();
    const correo_electronico = correo_electronicoInput.value.trim();

    const soloNumeros = /^\d+$/;

    if (validarCampos) {
        

     if (importe === "" || !soloNumeros.test(importe) || importe.length > 15) {
        alert("El importe debe tener máximo 15 dígitos numéricos.");
        return false;
    }
    if (primer_apellido === "" || primer_apellido.length > 20  ||primer_apellido.includes("ñ") || primer_apellido.includes("Ñ") 
    ||segundo_apellido === "" || segundo_apellido.length > 20 || segundo_apellido.includes("ñ") || segundo_apellido.includes("Ñ") 
    || nombre === "" || nombre.length > 20 || nombre.includes("ñ") || nombre.includes("Ñ")) {

    alert("El campo primer apellido, segundo apellido y nombre deben tener máximo 20 letras y no deben contener la letra ñ.");
    return false;
    }
    if (Tipo_de_dentificacion == "0") {

        alert("elecciona una opcion valida en tipo de indentificacion");
        return false;

    }
    if (referencia === "" || referencia.length > 35  || referencia.includes("ñ") || referencia.includes("Ñ")) {
    alert("El campo referencia debe tener máximo 35 letras y no debe contener la letra ñ.");
    return false;
    }
     
          if ( celular.length > 10) {
        alert("El tipo de celular tener máximo 10 digitos.");
        return false;
    }
          if ( correo_electronico.length > 50|| correo_electronico.includes("ñ") || correo_electronico.includes("Ñ")) {
        alert("El correo electronico tener máximo 50 letras y no tiene que contener la letra ñ.");
        return false;
    }  
        }

   const importe_directo = completarCampo(importe, 15);
    const Espacios_primer_apellido = justificarIzquierda(primer_apellido, 20);
    const Espacios_segundo_apellido = justificarIzquierda(segundo_apellido, 20);
    const Espacios_nombre = justificarIzquierda(nombre, 20);
    const Espacios_referencia = justificarIzquierda(referencia, 35);
    const iaccion_Tipo_de_dentificacion = justificarDerecha(Tipo_de_dentificacion, 1);
    const fecha_na = justificarDerecha(document.getElementById('fechaFormateada').value, 8);
    const celular_directo = justificarDerecha(celular, 10);
    const Espacios_correo_electronico = justificarDerecha(correo_electronico, 50);

    const registro = importe_directo + Espacios_primer_apellido + Espacios_segundo_apellido + Espacios_nombre + Espacios_referencia + iaccion_Tipo_de_dentificacion + fecha_na + celular_directo + Espacios_correo_electronico;
    
    registros.push(registro);
    importeInput.value = "";
    primer_apellidoInput.value = "";
    segundo_apellidoInput.value = "";
    nombreInput.value = "";
    Tipo_de_dentificacionInput.value = "0";
    celularInput.value="";
    fecha_de_vigencia.value= "";
    fechaFormateada.value="";
    correo_electronicoInput.value="";
  

    actualizarVistaPreviaRegistros();
}

function insertarRegistrosMultiples() {
    const cantidad = parseInt(document.getElementById("cantidad_de_registros").value);
    
    if (registroSeleccionadoIndex === null || registros[registroSeleccionadoIndex] === undefined) {
        alert("Por favor selecciona un registro de la vista previa.");
        return;
    }

    if (isNaN(cantidad) || cantidad < 1) {
        alert("Ingresa una cantidad válida (mínimo 1).");
        return;
    }

    const registroOriginal = registros[registroSeleccionadoIndex];

    // Determinar la posición exacta de la referencia dentro del registro
    // Si sabes que empieza en la posición 75, se extrae así:
// Si sabes que empieza en la posición 75, se extrae así:
const inicioReferencia = 75;
const finReferencia = inicioReferencia + 35;

const referenciaCompleta = registroOriginal.substring(inicioReferencia, finReferencia);
const parteNumerica = referenciaCompleta.slice(0, 5); // primeros 5 caracteres
const parteFija = referenciaCompleta.slice(5);        // los siguientes 30 caracteres

let numeroInicial = parseInt(parteNumerica, 10);

if (isNaN(numeroInicial)) {
    alert("Los primeros 5 caracteres de la referencia deben ser numéricos.");
    return;
}

for (let i = 1; i <= cantidad; i++) {
    const nuevoNumero = completarCampo(numeroInicial + i, 5); // función que rellena con ceros
    const nuevaReferencia = nuevoNumero + parteFija;

    // Sustituir por posición dentro del registro
    const nuevoRegistro = 
        registroOriginal.substring(0, inicioReferencia) +
        nuevaReferencia +
        registroOriginal.substring(finReferencia);

    registros.push(nuevoRegistro);
}


    actualizarVistaPreviaRegistros();
    // alert(`Se insertaron ${cantidad} registros con referencia incremental.`);
}

// Función para completar con ceros a la izquierda
function completarCampo(numero, longitud) {
    return numero.toString().padStart(longitud, '0');
}

let salirConfirmado = false; // variable global para controlar el beforeunload


function descargarArchivo(formato) {
  if (registros.length === 0) {
    alert("No hay registros para guardar.");
    return false;
  }

  const NomenglaturaArchivo = localStorage.getItem("NomenglaturaArchivo") || "archivo";

  if (formato === "txt") {
    const numeroRegistros = registros.length.toString().padStart(7, '0');
    let totalImporte = registros.reduce((suma, reg) => {
      const importeStr = reg.substring(0, 15).trim();
      const importe = parseInt(importeStr) || 0;
      return suma + importe;
    }, 0);
    const encabezadoGuardado = localStorage.getItem("encabezadoGuardado") || "";
    const totalImporteStr = totalImporte.toString().padStart(18, '0');
    const sumario = `\n${numeroRegistros}${totalImporteStr}`;
    const contenido = encabezadoGuardado + '\n' + registros.join('\n') + sumario;

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = `OP_${NomenglaturaArchivo}.txt`;
    enlaceDescarga.click();
    URL.revokeObjectURL(url);
    document.getElementById("formato_descarga").selectedIndex = 0;

  } else if (formato === "excel") {
  const longitudes = [15, 20, 20, 20, 35, 1, 8, 10, 50];
  const filas = registros.map(registroPlano => {
    const campos = [];
    let inicio = 0;

    for (let i = 0; i < longitudes.length; i++) {
      const campo = registroPlano.slice(inicio, inicio + longitudes[i]).trim();
      campos.push(campo);
      inicio += longitudes[i];
    }

    // Reordenar campos: nombre (posición 3) al inicio, importe (posición 0) a posición 3
    const nuevoOrden = [
      campos[3], // Nombre
      campos[1], // Primer apellido
      campos[2], // Segundo apellido
   insertarPuntoEnCentavos(campos[0]),
      campos[4], // Referencia
      campos[5], // Tipo ID
    formatearFechaParaExcel(campos[6]), // Fecha con formato dd/mm/aaaa
      campos[7], // Celular
      campos[8]  // Correo
    ];

    return nuevoOrden;
  });

  const hoja = XLSX.utils.aoa_to_sheet(filas);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Datos");
  XLSX.writeFile(libro, `OP_${NomenglaturaArchivo}.xlsx`);
  document.getElementById("formato_descarga").selectedIndex = 0;
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
  document.getElementById("btn_Nuevo_registro").addEventListener("click", () => {
    validarCampos = true;
    agregarRegistro();
  });

  
  document.getElementById("formato_descarga").addEventListener("change", (event) => {
    const formato = event.target.value;
    validarCampos = false;
    descargarArchivo(formato);
  });

  document.getElementById("btn_Insertar").addEventListener("click", insertarRegistrosMultiples);

  ["importe", "primer_apellido","segundo_apellido","nombre","referencia","Tipo_de_dentificacion","fecha_de_vigencia","celular","correo_electronico"]
    .forEach(id => {
      document.getElementById(id).addEventListener("input", actualizarVistaPreviaRegistros);
    });
});
window.addEventListener('beforeunload', function (e) {
  if (!salirConfirmado) {
    e.preventDefault();
    e.returnValue = '';
  }
});
