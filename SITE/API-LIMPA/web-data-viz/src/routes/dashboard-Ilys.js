const express = require('express');
const router = express.Router();
const dashboardIlysController = require('../controllers/dashboardIlysController');

// Rota gráficos e indicadores
router.get('/funcionarios', dashboardIlysController.getUsers);

// router.get('/getIssues', function(req,res) {
//     dashboardIlysController.getIssues(req,res);
// });
router.get('/getIssues', dashboardIlysController.getIssues);
router.get(`/getUsers`, dashboardIlysController.getUsers);

// router.get('/chamados/abertos', dashboardIlysController.getIssues);

module.exports = router;
