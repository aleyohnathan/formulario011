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
    const fecha_de_generacion = document.getElementById("fecha_de_generacion").value;
    if (fecha_de_generacion) {
        const partes = fecha_de_generacion.split("-");
        const formato = partes[0] + partes[1] + partes[2];
        document.getElementById("fechaFormateada").value = formato;
        document.getElementById("fechaMostrada").textContent = formato;
      } 
  }   
    // Esperar que el DOM esté cargado para enlazar eventos
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("fecha").addEventListener("change", formatearFecha);
        document.querySelector(".form-body").addEventListener("submit", validarFormulariotrapasos);
      }); 


$(document).ready(function() {
  $('#banco_receptor').select2({
    placeholder: "Selecciona una opción",
    allowClear: true,
    width: '470px' 
  });
});
  // Cargar bancos guardados en localStorage al inicio
    window.onload = function () {
      const select = document.getElementById('banco_receptor');
      const bancosGuardados = JSON.parse(localStorage.getItem('bancosExtra')) || [];

      bancosGuardados.forEach(banco => {
        const option = document.createElement('option');
        option.value = banco.clave;
        option.text = banco.nombre;
        select.appendChild(option);
      });
    };

    function validarNumeros(input) {
      input.value = input.value.replace(/\D/g, '').slice(0, 3);
    }

// JS
let ignorarValidacionDeSalida = false; // Variable de control para evitar advertencias de salida

window.addEventListener('beforeunload', function (e) {
  if (ignorarValidacionDeSalida) return; // No preguntar si estamos agregando banco

  // Aquí puedes poner condiciones reales si hay datos sin guardar, etc.
  e.preventDefault();
  e.returnValue = '';
}); 

function agregarBanco() {
  ignorarValidacionDeSalida = true; // Evitar la validación de salida solo para esta función

  const select = document.getElementById('banco_receptor');
  const clave = document.getElementById('clave').value.trim();
  const nombre = document.getElementById('nombre').value.trim();

  if (clave === '' || nombre === '') {
    alert("Por favor llena ambos campos.");
    ignorarValidacionDeSalida = false;
    return;
  }

  if (!/^\d{1,3}$/.test(clave)) {
    alert("La clave debe ser un número de hasta 3 dígitos.");
    ignorarValidacionDeSalida = false;
    return;
  }

  const existe = Array.from(select.options).some(opt => opt.value === clave);
  if (existe) {
    alert("Ya existe un banco con esa clave.");
    ignorarValidacionDeSalida = false;
    return;
  }

  // Crear y agregar nueva opción
  const nuevaOpcion = document.createElement('option');
  nuevaOpcion.value = clave;
  nuevaOpcion.text = nombre;
  select.appendChild(nuevaOpcion);

  // Guardar en localStorage
  const bancosGuardados = JSON.parse(localStorage.getItem('bancosExtra')) || [];
  bancosGuardados.push({ clave, nombre });
  localStorage.setItem('bancosExtra', JSON.stringify(bancosGuardados));

  // Limpiar campos
  document.getElementById('clave').value = '';
  document.getElementById('nombre').value = '';

  alert("Banco agregado y guardado correctamente.");


  setTimeout(() => {
    ignorarValidacionDeSalida = false;
  }, 100);
}


function toggleFormulario() {
  const formulario = document.getElementById('formAgregarBanco');
  const flecha = document.getElementById('flecha');

  if (formulario.style.display === 'none' || formulario.style.display === '') {
    formulario.style.display = 'block';
    flecha.textContent = '▼'; // Flecha hacia abajo
  } else {
    formulario.style.display = 'none';
    flecha.textContent = '➤'; // Flecha hacia la derecha
  }
}

      

 function completarCampo(valor, longitud) {
    return String(valor).padStart(longitud, '0');
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
    // Despliega menú hamburguesa
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}


function actualizarVistaPreviaRegistros() {
  const preview = document.getElementById('previewArchivo');
  preview.innerHTML = ''; // Limpia la lista

  if (registros.length === 0) {
    preview.innerHTML = '<li>Aquí se mostrará el diseño de la estructura del archivo</li>';
  } else {
    registros.forEach((registro, index) => {
      const li = document.createElement('li');
      li.textContent = registro.plano; // Muestra solo la cadena del registro
      li.dataset.index = index;
      li.classList.add('registro-item');
      li.addEventListener('click', () => seleccionarRegistro(index));
      preview.appendChild(li);
    });
  }
}
  // Espera a que el DOM esté cargado
  document.addEventListener("DOMContentLoaded", function () {
    const tipoDePago = document.getElementById("tipo_de_pago");
    const tipoDeCuenta = document.getElementById("tipo_de_cuenta_beneficiario");

    tipoDeCuenta.addEventListener("change", function () {
      if (tipoDeCuenta.value === "01") {
        tipoDePago.value = "03"; // Selecciona "Mismo banco" automáticamente
      }
      if (tipoDeCuenta.value === "03") {
        tipoDePago.value = "01"; // Selecciona "SPEI" automáticamente
      }
            if (tipoDeCuenta.value === "40") {
        tipoDePago.value = "01"; // Selecciona "SPEI" automáticamente
      }
      
      
    });
  });
function insertarPuntoEnCentavos(importeStr) {
  if (importeStr.length !== 15) return importeStr; 
  const parteEntera = importeStr.slice(0, 12); 
  const centavos = importeStr.slice(13);       
  return parteEntera + '.' + centavos;         
}

function agregarRegistro() {
    const secuenciaInput = document.getElementById('secuencia');
    const fecha_de_generacionInput = document.getElementById('fecha_de_generacion');
    const servicioInput = document.getElementById('servicio');
    const tipo_de_cuentaInput = document.getElementById('tipo_de_cuenta');
    const no_cuenta_cargoInput = document.getElementById('no_cuenta_cargo');
    const titular_de_cuenta_cargoInput = document.getElementById('titular_de_cuenta_cargo');
    const rfc_del_ordenanteInput = document.getElementById('rfc_del_ordenante');
    const leyenda_cargoInput = document.getElementById('leyenda_cargo');
    const importeInput = document.getElementById('importe');
    const monedaInput = document.getElementById('moneda');
    const banco_receptorInput = document.getElementById('banco_receptor');
    const tipo_de_cuenta_beneficiarioInput = document.getElementById('tipo_de_cuenta_beneficiario');
    const numero_de_cuenta_beneficiarioInput = document.getElementById('numero_de_cuenta_beneficiario');
    const nombre_del_beneficiarioInput = document.getElementById('nombre_del_beneficiario');
    const leyenda_abonoInput = document.getElementById('leyenda_abono');
    const rfc_del_beneficiarioInput = document.getElementById('rfc_del_beneficiario');
    const ivaInput = document.getElementById('iva');
    const referencia_de_cobranzaInput = document.getElementById('referencia_de_cobranza');
    const claveInput = document.getElementById('clave');
    const tipo_de_pagoInput = document.getElementById('tipo_de_pago');
    const fillerInput = document.getElementById('filler');

    const secuencia = secuenciaInput.value.trim();
    const fecha_de_generacion = fecha_de_generacionInput.value.trim();
    const servicio = servicioInput.value.trim();
    const tipo_de_cuenta = tipo_de_cuentaInput.value.trim();
    const no_cuenta_cargo = no_cuenta_cargoInput.value.trim();
    const titular_de_cuenta_cargo = titular_de_cuenta_cargoInput.value.trim();
    const rfc_del_ordenante = rfc_del_ordenanteInput.value.trim();
    const leyenda_cargo = leyenda_cargoInput.value.trim();
    const importe = importeInput.value.trim();
    const moneda = monedaInput.value.trim();
    const banco_receptor = banco_receptorInput.value.trim();
    const tipo_de_cuenta_beneficiario = tipo_de_cuenta_beneficiarioInput.value.trim();
    const numero_de_cuenta_beneficiario = numero_de_cuenta_beneficiarioInput.value.trim();
    const nombre_del_beneficiario = nombre_del_beneficiarioInput.value.trim();
    const leyenda_abono = leyenda_abonoInput.value.trim();
    const rfc_del_beneficiario = rfc_del_beneficiarioInput.value.trim();
    const iva = ivaInput.value.trim();
    const referencia_de_cobranza = referencia_de_cobranzaInput.value.trim();
    const clave = claveInput.value.trim();
    const tipo_de_pago = tipo_de_pagoInput.value.trim();
    const filler = fillerInput.value.trim();
    const soloNumeros = /^\d+$/;

    if (validarCampos) { 
    if (!/^\d{1,7}$/.test(secuencia)) {
    alert("La secuencia debe contener solo números (máximo 7 dígitos).");
    return false;
    }
    if (fecha_de_generacion === "") {
        alert("Por favor, completa el campo fecha de generacion.");
        return false;
    }
    if (!/^\d{1,20}$/.test(no_cuenta_cargo)) {
    alert("El numero de cuenta cargo debe contener solo números (máximo 20 dígitos).");
    return false;
    }
    if (titular_de_cuenta_cargo === "" ||titular_de_cuenta_cargo.length > 40 ) {
        alert("El titular de la cuenta es obligatorio y de maximo 40 caracteres");
        return false;
    }
    if (rfc_del_ordenante === "" ||rfc_del_ordenante.length > 18 ) {
        alert("El el RFC del ordenante es obligatorio y de maximo 18 caracteres");
        return false;
    }
    if (leyenda_cargo === "" || leyenda_cargo.length > 30) {
        alert("La leyenda del cargo es obligatorio y de maximo 30 caracteres");
        return false;
    }
    if (!/^\d{1,15}$/.test(importe)) {
    alert("El importe debe contener solo números (máximo 15 dígitos).");
    return false;
    }
    if (!/^\d{1,3}$/.test(banco_receptor)  || banco_receptor === "000") {
    alert("Ingrese una opcion de banco receptor valida");
    return false;
    }
    if (!/^\d{1,2}$/.test(tipo_de_cuenta_beneficiario)  || tipo_de_cuenta_beneficiario === "00" ) {
    alert("Ingrese una opcion de tipo de cuenta de beneficiario valida");
    return false;
    }
// Validación dinámica del número de cuenta según tipo de cuenta del beneficiario
if (!soloNumeros.test(numero_de_cuenta_beneficiario)) {
    alert("El número de cuenta del beneficiario solo debe contener dígitos.");
    return false;
}

if (tipo_de_cuenta_beneficiario === "01") {
    if (numero_de_cuenta_beneficiario.length < 14 || numero_de_cuenta_beneficiario.length > 20) {
        alert("Para el tipo '01 - Mismo banco', el número de cuenta debe tener entre 14 y 20 dígitos.");
        return false;
    }
} else if (tipo_de_cuenta_beneficiario === "03") {
    if (numero_de_cuenta_beneficiario.length !== 16) {
        alert("Para el tipo '03 - Tarjeta de débito', el número de cuenta debe tener exactamente 16 dígitos.");
        return false;
    }
} else if (tipo_de_cuenta_beneficiario === "40") {
    if (numero_de_cuenta_beneficiario.length !== 18) {
        alert("Para el tipo '40 - Cuenta CLABE', el número de cuenta debe tener exactamente 18 dígitos.");
        return false;
    }
}
    if (nombre_del_beneficiario === "" || nombre_del_beneficiario.length > 40) {
        alert("El nombre del beneficiario es obligatorio y de maximo 40 caracteres");
        return false;
    }
    if (leyenda_abono === "" ||leyenda_abono.length > 30 ) {
        alert("La leyenda del abono es obligatorio y de maximo 30 caracteres");
        return false;
    }
    if (rfc_del_beneficiario.length > 18) {
        alert("El RFC del befeciario no debe tener más de 18 caracteres.");
        return false;
    }
    if (iva.trim() !== "" || iva.length > 2) { // Solo validar si el campo NO está vacío
        if (!soloNumeros.test(iva)) {
            alert("El iva debe contener solo números (máximo 2 dígitos).");
            return false;
        }
    }
    if (referencia_de_cobranza.length > 40) {
        alert("la referencia de cobranza no debe tener más de 40 caracteres.");
        return false;
    }
    if (!/^\d{1,2}$/.test(tipo_de_pago)  || tipo_de_pago === "00" ) {
        alert("Ingrese una opcion de tipo de pago valida.");
        return false;
    }
 
    }

    const ceros_secuencia = completarCampo(secuencia , 7);
    const fecha_de_generacion_directo  = document.getElementById('fechaFormateada').value;
    const servicio_directo = completarCampo(servicio, 2);
    const tipo_de_cuenta_directo = completarCampo(tipo_de_cuenta , 2);
    const ceros_no_cuenta_cargo = completarCampo(no_cuenta_cargo  , 20);
    const Espacios_titular_de_cuenta_cargo = justificarIzquierda(titular_de_cuenta_cargo, 40);
    const Espacios_rfc_del_ordenante  = justificarIzquierda(rfc_del_ordenante , 18);
    const Espacios_leyenda_cargo  = justificarIzquierda(leyenda_cargo , 30);
    const ceros_importe  = completarCampo(importe  , 15);
    const moneda_directo = completarCampo(moneda , 3);
    const iaccion_banco_receptor = justificarIzquierda(banco_receptor, 3);
    const iaccion_tipo_de_cuenta_beneficiario = justificarIzquierda(tipo_de_cuenta_beneficiario, 2);
    const ceros_numero_de_cuenta_beneficiario= completarCampo(numero_de_cuenta_beneficiario  , 20);
    const Espacios_nombre_del_beneficiario  = justificarIzquierda(nombre_del_beneficiario, 40);
    const Espacios_leyenda_abono  = justificarIzquierda(leyenda_abono, 30);
    const Espacios_rfc_del_beneficiario  = justificarIzquierda(rfc_del_beneficiario, 18);
    const ceros_iva = iva !== "" ? completarCampo(iva , 2) : "  ";
    const Espacios_referencia_de_cobranza  = justificarIzquierda(referencia_de_cobranza, 40);
    const Espacios_Clave  = justificarIzquierda(clave, 12);
    const iaccion_tipo_de_pago  = justificarIzquierda(tipo_de_pago, 2);
    const Espacios_filler   = justificarIzquierda(filler, 40);

    const registro = ceros_secuencia + fecha_de_generacion_directo + servicio_directo + tipo_de_cuenta_directo + ceros_no_cuenta_cargo + Espacios_titular_de_cuenta_cargo+ Espacios_rfc_del_ordenante + Espacios_leyenda_cargo + ceros_importe + moneda_directo + iaccion_banco_receptor + iaccion_tipo_de_cuenta_beneficiario + ceros_numero_de_cuenta_beneficiario + Espacios_nombre_del_beneficiario +Espacios_leyenda_abono  +Espacios_rfc_del_beneficiario + ceros_iva + Espacios_referencia_de_cobranza  + Espacios_Clave  + iaccion_tipo_de_pago  + Espacios_filler;

    registros.push({
  plano: registro, // el string con ceros para .txt
original: {
  no_cuenta_cargo: no_cuenta_cargo,
  numero_de_cuenta_beneficiario: numero_de_cuenta_beneficiario,
  rfc_del_beneficiario: rfc_del_beneficiario,
  referencia_de_cobranza: referencia_de_cobranza,
  iva: iva
}
});

    secuenciaInput.value = "";
    fecha_de_generacionInput.value = "";
    fechaFormateada.value= "";
    no_cuenta_cargoInput.value = "";
    titular_de_cuenta_cargoInput.value = "";
    rfc_del_ordenanteInput.value = "";
    leyenda_cargoInput.value = "";
    importeInput.value = "";
    numero_de_cuenta_beneficiarioInput.value = "";
    nombre_del_beneficiarioInput.value = "";
    leyenda_abonoInput.value = "";
    rfc_del_beneficiarioInput.value = "";
    ivaInput.value = "";
    referencia_de_cobranzaInput.value = "";
    tipo_de_cuenta_beneficiarioInput.value = "00";
    tipo_de_pagoInput.value = "00";
  $('#banco_receptor').val('000').trigger('change');


 

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
  const registroPlano = registroOriginal.plano;

  let secuenciaOriginal = parseInt(registroPlano.substring(0, 7), 10);

  if (isNaN(secuenciaOriginal)) {
    alert("Introduce un número válido para la secuencia inicial.");
    return;
  }

  for (let i = 1; i <= cantidad; i++) {
    let nuevaSecuencia = completarCampo(secuenciaOriginal + i, 7);
    let nuevoPlano = nuevaSecuencia + registroPlano.substring(7);

    registros.push({
      plano: nuevoPlano,
      original: { ...registroOriginal.original } // Copiamos los valores originales tal como estaban
    });
  }

  actualizarVistaPreviaRegistros();
  
}
let salirConfirmado = false; 

function validarFormulariotrapasos(event, formato) {
  console.log("Formato seleccionado", formato )
  if (registros.length === 0) {
    alert("No hay registros para guardar.");
    return false;
  }

  const NomenglaturaArchivo = localStorage.getItem("NomenglaturaArchivo") || "archivo";
  const encabezadoGuardado = localStorage.getItem("encabezadoGuardado") || "";
  const numeroRegistros = registros.length.toString().padStart(7, '0');

  if (formato === "txt") {
let totalImporte = registros.reduce((suma, reg) => {
    const importeStr = reg.plano.substring(128, 143).trim();
    const importe = parseInt(importeStr) || 0;
    return suma + importe;
}, 0);
    const totalImporteStr = totalImporte.toString().padStart(18, '0');
    const sumario = `\n${numeroRegistros}${totalImporteStr}`;
   const contenido = encabezadoGuardado + '\n' + registros.map(r => r.plano).join('\n') + sumario;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download =  `TRA_${NomenglaturaArchivo}.txt`;
    enlaceDescarga.click();
    URL.revokeObjectURL(url);

    document.getElementById("formato_descarga").selectedIndex = 0;

  } else if (formato === "excel") {
    const longitudes = [7, 8, 2, 2, 20, 40, 18, 30, 15, 3, 3, 2, 20, 40, 30, 18, 2, 40, 12, 2, 40 ];
const filas = registros.map(({ plano, original }) => {
  const campos = [];
  let inicio = 0;

  for (let i = 0; i < longitudes.length; i++) {
    let campo = plano.slice(inicio, inicio + longitudes[i]).trim();

    // Cuenta de cargo
    if (i === 4) {
      campo = original.no_cuenta_cargo;
    }
    // Cuenta del beneficiario
    if (i === 12) {
      campo = original.numero_de_cuenta_beneficiario;
    }

    campos.push(campo);
    inicio += longitudes[i];
  }

  const nuevoOrden = [
    campos[4],  // Cuenta de cargo con '
    campos[5],
    campos[6],
    campos[7],
    insertarPuntoEnCentavos(campos[8]),
    campos[9],
    campos[10],
    campos[11],
    campos[12], // Cuenta del beneficiario con '
    campos[13],
    campos[14],
    campos[15],
    campos[16],
    campos[17],
    campos[19],
  ];

  return nuevoOrden;
});
     const hoja = XLSX.utils.aoa_to_sheet(filas, { raw: false }); // 👈 MUY IMPORTANTE
    const columnasTexto = [4, 12]; // columnas de cuenta cargo y beneficiario

for (let i = 0; i < filas.length; i++) {
  columnasTexto.forEach(col => {
    const letraCol = XLSX.utils.encode_col(col);
    const celdaRef = letraCol + (i + 1); // +1 porque Excel empieza en 1
    const celda = hoja[celdaRef];
    if (celda) {
      celda.t = "s"; // fuerza tipo texto
    }
  });
}
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Datos");
    XLSX.writeFile(libro, `TRA_${NomenglaturaArchivo}.xlsx`);

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

  // 🔁 Desencadenar descarga al cambiar opción en el select
  document.getElementById("formato_descarga").addEventListener("change", (event) => {
    const formato = event.target.value;
    validarCampos = false;
    // Se pasa el evento y el formato seleccionado (txt o excel)
    validarFormulariotrapasos(event, formato);
  });

  document.getElementById("btn_Insertar").addEventListener("click", insertarRegistrosMultiples);

  ["importe", "primer_apellido", "segundo_apellido", "nombre", "referencia", "Tipo_de_dentificacion", "fecha_de_vigencia", "celular", "correo_electronico"]
    .forEach(id => {
      document.getElementById(id).addEventListener("input", actualizarVistaPreviaRegistros);
    });
});

document.getElementById("goBottomBtn").addEventListener("click", function () {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
});
window.addEventListener('beforeunload', function (e) {
  if (!salirConfirmado) {
    e.preventDefault();
    e.returnValue = '';
  }
});
