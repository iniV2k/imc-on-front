document.addEventListener("DOMContentLoaded", function() {
    console.log("JS carregado!");

    async function obterDados() {
        try {
            const response = await fetch("http://localhost:8080/api/imc", {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error("Não foi possível carregar os registros.");
            }

            const data = await response.json();
            console.log("Dados recebido da API: ", data);

            if (Array.isArray(data)) {
                data.reverse();
                mostrarDadosNaTela(data);
            } else {
                console.log("Os dados não são um array", data);
            }

        } catch (e) {
            console.log("Erro na requisição: ", e);
        }
    }

    function mostrarDadosNaTela(data) {
        const tabelaIMC = document.querySelector("#tabelaIMC tbody");

        if (!tabelaIMC) {
            console.log("Não foi possível encontrar tbody");
            return;
        }
    
        tabelaIMC.innerHTML = '';

        data.forEach(item => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.peso}</td>
                <td>${item.altura}</td>
                <td>${item.sexo}</td>
                <td>${item.valorImc}</td>
                <td>${item.dataHoraRegistro}</td>
            `;

            tabelaIMC.appendChild(tr);
        });
    }

    obterDados();    

});

document.getElementById("imcForm").addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log("Formulário enviado!");

    const nome = document.getElementById("nome").value;
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const sexo = document.getElementById("sexo").value;

    const dados = { nome, peso, altura, sexo };

    try {
        console.log("Enviando requisição para o back...");

        const response = await fetch("http://localhost:8080/api/imc", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(dados)
        })

        console.log("Esperando resposta do servidor...");
        const data = await response.json();

        console.log("Resposta do servidor: ", data);
    } catch (e) {
        console.log("Erro: ", e);
    }

    document.getElementById("imcForm").reset();
    window.location.reload();

});