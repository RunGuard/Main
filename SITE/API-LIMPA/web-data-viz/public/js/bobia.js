var conversa = []

function abrirChat() {
    document.getElementById("janelaChat").style.display = "flex";
}

function fecharChat() {
    document.getElementById("janelaChat").style.display = "none";
}

function obterHoraAtual() {
    const options = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const agora = new Date();
    return agora.toLocaleTimeString('pt-BR', options);
}

async function gerarResposta() {
    const pergunta = document.getElementById('entradaUsuario').value;

    var entrada = document.getElementById("entradaUsuario");
    var mensagem = entrada.value.trim();

    const response = await fetch('/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta })
    });

    const data = await response.json();

    conversa.push(mensagem)
    conversa.push(data.resultado)

    if (mensagem !== "") {
        var mensagemUsuario = document.createElement("div");
        mensagemUsuario.classList.add("mensagem", "usuario");
        mensagemUsuario.innerText = mensagem;
        document.getElementById("corpoChat").appendChild(mensagemUsuario);

        var horaUsuario = document.createElement("div");
        horaUsuario.classList.add("hora-mensagem");
        horaUsuario.innerText = obterHoraAtual();
        document.getElementById("corpoChat").appendChild(horaUsuario);

        entrada.value = "";

        setTimeout(function () {
            var mensagemAssistente = document.createElement("div");
            mensagemAssistente.classList.add("mensagem", "assistente");
            mensagemAssistente.innerText = data.resultado;
            document.getElementById("corpoChat").appendChild(mensagemAssistente);

            var horaAssistente = document.createElement("div");
            horaAssistente.classList.add("hora-mensagem", "assistente");
            horaAssistente.innerText = obterHoraAtual();
            document.getElementById("corpoChat").appendChild(horaAssistente);

            document.getElementById("corpoChat").scrollTop = document.getElementById("corpoChat").scrollHeight;
        }, 1000);

        document.getElementById("corpoChat").scrollTop = document.getElementById("corpoChat").scrollHeight;
    }
}