// const { getCatFacts, request } = require('../common');
const { getCatFacts, request, axios } = require('/opt/common');

let response = {};

exports.handler = (event) => {
  request('https://httpbin.org/get', function(error, response, body) {
    console.log('handler status: ', response && response.statusCode); // Print the response status code if a response was received
    console.log('handler body:', body); // Print the HTML for the Google homepage.
    response.body1 = body;
  });

  getCatFacts().then((res) => { console.log('Common output: ', res.data); });
  axios.get('https://api.chucknorris.io/jokes/random').then((resAx)=>{console.log('Output from AXIOS (handler2): ',resAx.data)});
  
  
  return response;
};
