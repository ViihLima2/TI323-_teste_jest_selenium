function calcularIMC(peso, altura) {
    if (peso <= 0 || altura <= 0) {
        throw new Error('Valores inválidos');
    }

    return peso / (altura * altura);
}

module.exports = { calcularIMC };