function calcular() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    altura = altura.replace(",", ".");

    fetch("http://localhost:3000/imc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            peso: Number(peso),
            altura: Number(altura)
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.imc) {
            document.getElementById("resultado").innerText = data.imc;
        } else {
            document.getElementById("resultado").innerText = data.erro;
        }
    })
    .catch(err => {
        console.log("Erro:", err);
        document.getElementById("resultado").innerText = "Erro ao conectar com a API";
    });
}