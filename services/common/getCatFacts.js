const axios = require('axios');
const getCatFacts = async function () {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response;
};

module.exports  = {
    getCatFacts
}
