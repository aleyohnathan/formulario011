export function completarCampo(valor, longitud) {
    return valor.padStart(longitud, '0') + '_';
}
