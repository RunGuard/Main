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

module.exports = {
  listar,
  listarDetalhes,
};