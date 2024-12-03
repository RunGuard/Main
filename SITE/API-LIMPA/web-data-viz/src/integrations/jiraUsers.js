const axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {username, password };

async function getUsers() {
  try {
    const baseUrl = `https://${domain}.atlassian.net`;
    const config = {
      method: 'get',
      url: `${baseUrl}/rest/api/3/users`,
      headers: { 'Content-Type': 'application/json' },
      auth,
    };

    const response = await axios.request(config);
    const usersList = response.data.map((dados) => ({
      accountId: dados.accountId,
      accountType: dados.accountType,
      emailAddress: dados.emailAddress,
      displayName: dados.displayName,
      active: dados.active,
    }));
    return usersList.filter((user) => user.accountType === 'atlassian' && user.active === true);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.response?.data?.errors || error.message);
    throw error;
  }
}

module.exports = getUsers;
