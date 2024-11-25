const express = require('express');
const router = express.Router();
const aleController = require('../controllers/aleController');

router.get('/ale/obterDados/:fkEquipamento',  (req, res) => {
    const { fkEquipamento } = req.params;

    if (isNaN(fkEquipamento)) {
        return res.status(400).json({ error: 'ID de equipamento inválido' });
    }

    try {
        const data =  aleController.obterDados(req, res);
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
