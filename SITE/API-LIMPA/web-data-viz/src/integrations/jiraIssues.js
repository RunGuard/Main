const axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = { username, password };

async function getIssues() {
  try {
    const baseUrl = `https://${domain}.atlassian.net`;
    const config = {
      method: 'get',
      url: `${baseUrl}/rest/api/2/search`,
      headers: { 'Content-Type': 'application/json' },
      auth,
    };
    const response = await axios.request(config);

    return response.data.issues.map((issue) => ({
      key: issue.key,
    }));
  } catch (error) {
    console.error('Erro ao buscar issues:', error.message);
    throw error;
  }
}

async function getSingleIssue(listIssues) {
  const issuesList = [];
  try {
    const baseUrl = `https://${domain}.atlassian.net`;

    for (const element of listIssues) {
      
      const issueKey = element.key;
      const config = {
        method: 'get',
        url: `${baseUrl}/rest/api/2/issue/${issueKey}`,
        headers: { 'Content-Type': 'application/json' },
        auth,
      };
      
      const response = await axios.request(config);
      issuesList.push({
        description: response.data.fields.summary,
        priority: response.data.fields.priority.name,
        displayName: response.data.fields.assignee.displayName,
        created: response.data.fields.created,
        status: response.data.fields.status.name,
        creator: response.data.fields.creator.displayName,
      });
    }
    let filteredList = issuesList.filter((itens) => itens.status != 'Itens concluídos');
    return filteredList;
  } catch (error) {
    console.error('Erro ao buscar detalhes das issues:', error.message);
    throw error;
  }
}

module.exports = { getIssues, getSingleIssue };
