export function completarCampo(valor, longitud) {
    return valor.padStart(longitud, '0');
}

export function justificarIzquierda(valor, longitud) {
    valor = valor.toString();
    if (valor.length < longitud) {
        valor = valor.padEnd(longitud, ' ');
    } else if (valor.length > longitud) {
        valor = valor.substring(0, longitud);
    }
    return valor;
}
