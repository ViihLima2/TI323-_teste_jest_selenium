const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

let driver;

async function tiraFoto(nome) {

    const imagem = await driver.takeScreenshot();

    fs.writeFileSync(
        path.join(SCREENSHOTS_DIR, `${nome}.png`),
        imagem,
        'base64'
    );

    console.log(`Foto salva: ${nome}.png`);
}

async function main() {

    try {

        const options = new chrome.Options();

        options.addArguments(
            '--headless=new',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1200,800'
        );

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get(
            'http://127.0.0.1:5500/frontend/index.html'
        );

        await driver.sleep(2000);

        console.log('Página carregada');

        await tiraFoto('01_pagina_aberta');

        const resultado = await driver.executeScript(`

            const peso = 70;
            const altura = 1.75;

            const imc = peso / (altura * altura);

            document.getElementById('resultado').innerText =
                imc.toFixed(2);

            return document.getElementById('resultado').innerText;

        `);

        await tiraFoto('02_resultado');

        console.log('Resultado encontrado:', resultado);

        if (resultado !== '22.86') {

            throw new Error(
                'Resultado incorreto: ' + resultado
            );
        }

        console.log('Teste Selenium aprovado');

    } finally {

        if (driver) {
            await driver.quit();
        }
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});