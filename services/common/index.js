const { getCatFacts } = require('./getCatFacts');
const axios = require('axios');
const KSUID = require('ksuid');
const request = require('request');

module.exports = {
    getCatFacts,
    axios,
    KSUID,
    request
}
