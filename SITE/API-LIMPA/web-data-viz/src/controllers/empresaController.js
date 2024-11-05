var empresaModel = require("../models/empresaModel");

// function buscarPorId(req, res) {
//   var id = req.params.id;

//   empresaModel.buscarPorId(id).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrarEmpresa(req, res) {
  var cnpj = req.body.cnpjServer;
  var razaoSocial = req.body.razaoSocialServer;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrarEmpresa(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function cadastrarEquipamento(req, res) {
  var nomeEquipamento = req.body.nomeEquipamentoServer;
  var cpuVersao = req.body.cpuVersaoServer;
  var memoriaRam = req.body.memoriaRamServer;
  var sistemaOperacional = req.body.sistemaOperacionalServer;
  var fkEmpresa = req.body.fkEmpresaServer;


  empresaModel.cadastrarEquipamento(nomeEquipamento, cpuVersao, memoriaRam, sistemaOperacional, fkEmpresa).then((resultado) => {
    res.status(201).json(resultado);
  });
  // empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
  //   if (resultado.length > 0) {
  //     res
  //       .status(401)
  //       .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
  //   } else {
  //     empresaModel.cadastrarEmpresa(razaoSocial, cnpj).then((resultado) => {
  //       res.status(201).json(resultado);
  //     });
  //   }
  // });
}

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
  } else {

      empresaModel.autenticar(email, senha)
          .then(
              function (resultadoAutenticar) {
                  console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                  console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                  if (resultadoAutenticar.length == 1) {
                      res.json({
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        cargo: resultadoAutenticar[0].cargo,
                      })

                  } else if (resultadoAutenticar.length == 0) {
                      res.status(403).send("Email e/ou senha inválido(s)");
                  } else {
                      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                  }
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }

}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var cargo = req.body.cargoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está undefined!");
  } else if (fkEmpresa == undefined) {
      res.status(400).send("Sua empresa a vincular está undefined!");
  } else {

      // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
      empresaModel.cadastrar(nome, cargo, email, senha, cpf, fkEmpresa)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

module.exports = {
  // buscarPorId,
  listar,
  buscarPorCnpj,
  cadastrarEmpresa,
  cadastrarEquipamento,
  autenticar,
  cadastrar
};
