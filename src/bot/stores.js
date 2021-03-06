require('dotenv/config');
const axios = require('axios');

const searchStore = (latitude, longitude) => axios.get(process.env.API_URL,
  {
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': process.env.API_ID,
    },
    params: {
      latitude: `${latitude}`,
      longitude: `${longitude}`,

    },
  })
  .then((response) => response.data.data, () => 'error');

module.exports.searchStore = searchStore;
