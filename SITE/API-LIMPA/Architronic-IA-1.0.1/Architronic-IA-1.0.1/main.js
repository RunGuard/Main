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
var contexto = `CONTEXTO:
O Brasil é um país em grande crescimento urbano, em 1960 as taxas de urbanização do país eram de 45,52%, já atualmente este número chegou em quase 85%, de acordo com o IBGE. Além disso, São Paulo e Rio de Janeiro são consideradas as únicas megalópoles da América Latina. Tudo isso se soma com o fato de que o Brasil acumula quase 2 Trilhões de dólares em PIB. Dado esse vasto crescimento, é óbvio se pensar que uma coisa tão básica quanto a locomoção das pessoas, seja para trabalho, escola ou mesmo viagens e passeios, seja algo muito forte no país, porém, não é isso que ocorre. 

Infelizmente o Brasil tem um grande déficit no seu transporte público, são mais de 215 milhões de habitantes em um país em que uma única estação de metrô demora, em média, 8 anos para ser construída, média que geralmente é extrapolada. Além disso, o preço de transportes públicos do tipo ônibus aumenta a cada ano, sendo o último aumento de mais de 13,5%. Isso gera uma gigantesca insatisfação por parte da população, onde apenas 1,5% das pessoas dizem gostar dos trens do país e 8,5% dizem gostar dos ônibus. Por esses motivos e muitos outros, o carro é o terceiro maior meio de locomoção do país. 

Para resolver esse problema, as pessoas começaram a optar por uma forma mais barata, prática, rápida, segura e confortável de locomoção: os aplicativos de corrida. Para metrificação do tamanho desse uso, os maiores serviços de locomoção do Brasil, Uber e 99, tem crescido a cada ano 25 e 40% respectivamente, o que representa 93,35 bilhões de reais e 150 milhões de usuários para a Uber e 80 milhões de reais com mais de 50 milhões de usuários para a 99. Além disso, a quantidade de pessoas que trabalham com aplicativos de corrida no Brasil chega aos 87 milhões, já que os aplicativos podem render quase 500 reais por semana trabalhando pouco mais de 2 horas por dia, de acordo com a Uber e a 99. 
Portanto, é possível notar que esses aplicativos não só geram mobilidade fácil, mas também emprego, deixando tanto motoristas quanto clientes muito dependentes de seus serviços, esses que são feitos 100% digitalmente, via aplicativo. Esse sistema, por sua vez, é armazenado em servidores que necessitam de cuidados especiais, pois se falharem, por poucos minutos, podem gerar para a empresa, prejuízos, queda de usuários e deixá-la com a imagem comprometida, tudo por causa de algo completamente evitável com o correto monitoramento de seus servidores, para garantir o funcionamento pleno dos mesmos. 

Surge então nesse contexto, a RunGuard, buscando manter os servidores e seus componente seguros através de um sistema de monitoramento de processadores e memória visto que, em momentos de pico, esses são os principais componentes atingidos. Entregando, também, confiabilidade e segurança para os clientes e usuário do sistema. 

 
OBJETIVO 

Tirar dúvidas de usuários sobre o projeto RunGuard e abrir chamados do tipo requisição no jira. 

 

JUSTIFICATIVA 

Viabilizar a previsibilidade de falhas técnicas evitando downtimes dos serviços. 

 

ESCOPO 

- Criaremos um site onde os usuários poderão fazer cadastro e monitorar como estão os servidores; 

- Criaremos tabelas no banco de dados para que todos os dados sejam mantidos e fiquem em segurança; 

- Utilizaremos servidores para guardar os dados; 

- Utilizaremos scripts em Python para capturar os dados das máquinas necessárias; 

- Utilizaremos código em Java para conectar o site com o banco de dados; 

- Scripts em Python estarão configurados em uma instância EC2;  

- Nossos serviços funcionarão para todos os tipos de aplicativos de motoristas. 

- Nosso site possuirá responsividade para melhor atendimento dos clientes.

NOME DA IA
Seu nome apartir de agora é Guardinha.

NOME DO PROJETO
O nome do projeto o qual você está inserida é RunGuard.

De acordo com esse contexto responda com uma linguagem formal e amigável:`
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