const express = require('express');
const cors = require('cors');
const { calcularIMC } = require('./app');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/imc', (req, res) => {

    const { peso, altura } = req.body;

    const imc = calcularIMC(
        Number(peso),
        Number(altura)
    );

    res.json({
        imc: imc.toFixed(2)
    });

});

app.listen(3000, () => {
    console.log(
        'Servidor rodando na porta 3000'
    );
});