const { Builder, By } = require('selenium-webdriver');
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

    console.log(`📸 Foto salva: ${nome}.png`);
}

async function testarCaso(peso, altura, nomePrint, esperado) {
    await driver.get('http://127.0.0.1:5500/frontend/index.html');

    await driver.sleep(1000);

    await driver.findElement(By.id('peso')).clear();
    await driver.findElement(By.id('peso')).sendKeys(String(peso));

    await driver.findElement(By.id('altura')).clear();
    await driver.findElement(By.id('altura')).sendKeys(String(altura));

    await driver.findElement(By.tagName('button')).click();

    await driver.sleep(1000);

    const resultado = await driver.findElement(By.id('resultado')).getText();

    console.log(`Resultado (${nomePrint}):`, resultado);

    await tiraFoto(nomePrint);

    if (resultado !== esperado) {
        throw new Error(`Falha no teste ${nomePrint}: esperado ${esperado}, veio ${resultado}`);
    }
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

        console.log('Iniciando testes E2E');

        // =========================
        // CASO VÁLIDO
        // =========================
        await testarCaso(
            70,
            1.75,
            '01_valido_22_86',
            '22.86'
        );

        // =========================
        // CASO INVÁLIDO (NEGATIVO)
        // =========================
        await testarCaso(
            -50,
            1.70,
            '02_invalido_peso_negativo',
            'Valores inválidos'
        );

        console.log('Todos os testes E2E passaram');

    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

main().catch(err => {
    console.error('Erro no teste:', err.message);
    process.exit(1);
});