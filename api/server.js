const express = require('express');
const cors = require('cors');
const { calcularIMC } = require('./app');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/imc', (req, res) => {
    try {
        const { peso, altura } = req.body;

        const imc = calcularIMC(
            Number(peso),
            Number(altura)
        );

        return res.json({
            imc: imc.toFixed(2)
        });

    } catch (error) {
        return res.status(400).json({
            erro: error.message
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app;