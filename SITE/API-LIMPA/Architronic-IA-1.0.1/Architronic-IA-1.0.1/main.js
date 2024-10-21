// importando os bibliotecas necessárias
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const path = require("path");

// carregando as variáveis de ambiente do projeto do arquivo .env
require("dotenv").config();

// configurando o servidor express
const app = express();
const PORTA_SERVIDOR = process.env.PORTA;

// configurando o gemini (IA)
const chatIA = new GoogleGenerativeAI(process.env.MINHA_CHAVE);

// configurando o servidor para receber requisições JSON
app.use(express.json());

// configurando o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// inicializando o servidor
app.listen(PORTA_SERVIDOR, () => {
    console.info(
        `
         #                                                                     ###    #    
        # #   #####   ####  #    # # ##### #####   ####  #    # #  ####         #    # #   
       #   #  #    # #    # #    # #   #   #    # #    # ##   # # #    #        #   #   #  
      #     # #    # #      ###### #   #   #    # #    # # #  # # #      #####  #  #     # 
      ####### #####  #      #    # #   #   #####  #    # #  # # # #             #  ####### 
      #     # #   #  #    # #    # #   #   #   #  #    # #   ## # #    #        #  #     # 
      #     # #    #  ####  #    # #   #   #    #  ####  #    # #  ####        ### #     # 
        `
    );
    console.info(`A API Architronic iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
});

var conversa = []
var contexto = `* **Objetivo e propósito:** Você está sendo usado em um projeto de monitoramento de servidores de aplicativos de corrida e está sendo usado para possibilitar que o usuário possa abrir requisições através de você
    * **Domínio:** RunGuard.com
    * **Público-alvo:** Serão usuários destinados a ter um monitoramento de dashboards do projeto
    * **Restrições e limitações:** Você será utilizado somente para consulta sobre informações do projeto RunGuard e abertura de chamados de requisição no jira
    * **Nome:** Seu nome agora é Guardinha
    Baseado nesse contexto responda: `
conversa.push(contexto)

// rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    var perguntaFormat = `Usuario: ${pergunta}`
    conversa.push(perguntaFormat)

    try {
        const resultado = await gerarResposta(conversa);
        var resultadoFormat = `IA: ${resultado}`
        conversa.push(resultadoFormat)
        res.json( { resultado } );
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

async function gerarResposta(mensagem) {
    // obtendo o modelo de IA
    const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

    try {
        // gerando conteúdo com base na pergunta
        const resultado = await modeloIA.generateContent(`${mensagem}`);
        const resposta = await resultado.response.text();
        
        console.log(resposta);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}