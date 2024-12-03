const getUsers = require('../integrations/jiraUsers');
const { getIssues, getSingleIssue } = require('../integrations/jiraIssues');

exports.getUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

exports.getIssues = async (req, res) => {
    try {
      const chamados = await getIssues();
      const resultado = await getSingleIssue(chamados);
      res.json(resultado || []); 
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar chamados abertos' });
    }
  };

//   module.exports = {
//     getUsers,
//     getIssues,
//     getSingleIssue
// }
