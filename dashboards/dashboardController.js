var dashboardModel = require("../models/dashboardModel");

function listar(req, res) {
    dashboardModel.listar().then((resultado) => {
      res.status(200).json(resultado);
    });
}

function listarDetalhes(req, res) {
    var idEquipamentoBuscado = req.params.idEquipamentoBuscado

    dashboardModel.listarDetalhes(idEquipamentoBuscado).then((resultado) => {
      res.status(200).json(resultado);
    });
}

function atualizarGrafico1(req,res) {
  dashboardModel.atualizarGrafico1().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function atualizarGrafico2(req,res) {
  dashboardModel.atualizarGrafico2().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function atualizarGrafico3(req, res) {
  dashboardModel.atualizarGrafico3()
      .then((resultado) => {
          res.status(200).json(resultado);
      })
      .catch((erro) => {
          console.error("Erro ao atualizar gráfico 3:", erro);
          res.status(500).json({ erro: "Erro ao buscar dados do gráfico." });
      });
}

function percentualRAM(req,res){
  dashboardModel.percentualRAM().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a ultima data.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function percentualCPU(req, res) {
  dashboardModel.percentualCPU().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function(erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar a última data.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  listar,
  listarDetalhes,
  atualizarGrafico1,
  atualizarGrafico2,
  atualizarGrafico3,
  percentualRAM,
  percentualCPU
};