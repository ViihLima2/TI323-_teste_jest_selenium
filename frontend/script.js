async function calcular() {

    const peso =
        document.getElementById("peso").value;

    const altura =
        document.getElementById("altura").value;

    const resposta = await fetch(
        "http://localhost:3000/imc",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                peso,
                altura
            })
        }
    );

    const dados = await resposta.json();

    document.getElementById("resultado")
        .innerText = dados.imc;
}