const dadosModel = require("../models/aleModel");

async function obterDados(req, res) {
    const fkEquipamento = req.params.fkEquipamento;

    try {
        const results = await dadosModel.obterDados(fkEquipamento); // Chama o método no Model
        if (results.length == 0) {
            return res.status(404).json({ message: 'Dados não encontrados' });
        }
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    obterDados
};
