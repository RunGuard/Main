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
  percentualRAM,
  percentualCPU
};