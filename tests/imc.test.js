const { calcularIMC } = require('../api/app');

test('Calcula IMC normal', () => {

    expect(
        calcularIMC(70, 1.75).toFixed(2)
    ).toBe('22.86');

});

test('Calcula IMC sobrepeso', () => {

    expect(
        calcularIMC(90, 1.70).toFixed(2)
    ).toBe('31.14');

});

test('Calcula IMC obesidade', () => {

    expect(
        calcularIMC(120, 1.60).toFixed(2)
    ).toBe('46.87');

});

test('Não permite altura zero', () => {
    expect(() => calcularIMC(70, 0)).toThrow();
});

test('Não permite peso negativo', () => {
    expect(() => calcularIMC(-70, 1.75)).toThrow();
});

test('Não permite altura negativa', () => {
    expect(() => calcularIMC(70, -1.75)).toThrow();
});
