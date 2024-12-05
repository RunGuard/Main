var ambiente_processo = 'producao';
// var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

const { GoogleGenerativeAI } = require("@google/generative-ai");
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
const chatIA = new GoogleGenerativeAI(process.env.MINHA_CHAVE);

var app = express();

var indexRouter = require("./src/routes/index");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var empresasRouter = require("./src/routes/empresas");
var dashboardRouter = require("./src/routes/dashboard");
var dashboardDiegoRouter = require("./src/routes/dashboard-Diego");
var dashboardAnneRouter = require("./src/routes/dashboard-Anne");
var dashboardAleRouter = require("./src/routes/ale");
var rotaRoqueRouter = require("./src/routes/rotaRoque");
var duarteRouter = require("./src/routes/duarte");
var dashboardRoutes = require('./src/routes/dashboard-Ilys');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.use("/", indexRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/empresas", empresasRouter);
app.use("/dashboard", dashboardRouter);
app.use("/dashboard-Diego", dashboardDiegoRouter);
app.use("/dashboard-Anne", dashboardAnneRouter);
app.use("/ale", dashboardAleRouter);
app.use("/rotaRoque", rotaRoqueRouter);
app.use("/duarte", duarteRouter);
app.use('/api', dashboardRoutes);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});


var conversa = []
var contexto = `CONTEXTO:
O Brasil é um país em grande crescimento urbano, em 1960 as taxas de urbanização do país eram de 45,52%, já atualmente este número chegou em quase 85%, de acordo com o IBGE. Além disso, São Paulo e Rio de Janeiro são consideradas as únicas megalópoles da América Latina. Tudo isso se soma com o fato de que o Brasil acumula quase 2 Trilhões de dólares em PIB. Dado esse vasto crescimento, é óbvio se pensar que uma coisa tão básica quanto a locomoção das pessoas, seja para trabalho, escola ou mesmo viagens e passeios, seja algo muito forte no país, porém, não é isso que ocorre. 

Infelizmente o Brasil tem um grande déficit no seu transporte público, são mais de 215 milhões de habitantes em um país em que uma única estação de metrô demora, em média, 8 anos para ser construída, média que geralmente é extrapolada. Além disso, o preço de transportes públicos do tipo ônibus aumenta a cada ano, sendo o último aumento de mais de 13,5%. Isso gera uma gigantesca insatisfação por parte da população, onde apenas 1,5% das pessoas dizem gostar dos trens do país e 8,5% dizem gostar dos ônibus. Por esses motivos e muitos outros, o carro é o terceiro maior meio de locomoção do país. 

Para resolver esse problema, as pessoas começaram a optar por uma forma mais barata, prática, rápida, segura e confortável de locomoção: os aplicativos de corrida. Para metrificação do tamanho desse uso, os maiores serviços de locomoção do Brasil, Uber e 99, tem crescido a cada ano 25 e 40% respectivamente, o que representa 93,35 bilhões de reais e 150 milhões de usuários para a Uber e 80 milhões de reais com mais de 50 milhões de usuários para a 99. Além disso, a quantidade de pessoas que trabalham com aplicativos de corrida no Brasil chega aos 87 milhões, já que os aplicativos podem render quase 500 reais por semana trabalhando pouco mais de 2 horas por dia, de acordo com a Uber e a 99. 
Portanto, é possível notar que esses aplicativos não só geram mobilidade fácil, mas também emprego, deixando tanto motoristas quanto clientes muito dependentes de seus serviços, esses que são feitos 100% digitalmente, via aplicativo. Esse sistema, por sua vez, é armazenado em servidores que necessitam de cuidados especiais, pois se falharem, por poucos minutos, podem gerar para a empresa, prejuízos, queda de usuários e deixá-la com a imagem comprometida, tudo por causa de algo completamente evitável com o correto monitoramento de seus servidores, para garantir o funcionamento pleno dos mesmos. 

Surge então nesse contexto, a RunGuard, buscando manter os servidores e seus componente seguros através de um sistema de monitoramento de processadores e memória visto que, em momentos de pico, esses são os principais componentes atingidos. Entregando, também, confiabilidade e segurança para os clientes e usuário do sistema. 

 
OBJETIVO:

Tirar dúvidas de usuários sobre o projeto RunGuard e abrir chamados do tipo requisição no jira. 

 

JUSTIFICATIVA:

Viabilizar a previsibilidade de falhas técnicas evitando downtimes dos serviços. 

 

ESCOPO:

- Criaremos um site onde os usuários poderão fazer cadastro e monitorar como estão os servidores; 

- Criaremos tabelas no banco de dados para que todos os dados sejam mantidos e fiquem em segurança; 

- Utilizaremos servidores para guardar os dados; 

- Utilizaremos scripts em Python para capturar os dados das máquinas necessárias; 

- Utilizaremos código em Java para conectar o site com o banco de dados; 

- Scripts em Python estarão configurados em uma instância EC2;  

- Nossos serviços funcionarão para todos os tipos de aplicativos de motoristas. 

- Nosso site possuirá responsividade para melhor atendimento dos clientes.

NOME DA IA:
Seu nome apartir de agora é Guardinha.

NOME DO PROJETO:
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