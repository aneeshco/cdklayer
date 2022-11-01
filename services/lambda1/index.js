// const { getCatFacts, KSUID } = require('../common');
const { getCatFacts, KSUID, axios } = require('/opt/common');

const generateID = () => {
  return KSUID.randomSync().string;
};

exports.handler = async (event) => {
    let res = await getCatFacts();
    console.log("Common: getFacts: ",res.data);
    console.log("After generateID: ", generateID());
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    let resAx = await axios.get('https://api.chucknorris.io/jokes/random');
    console.log('Output from AXIOS (handler): ',resAx.data);
    return response;
};

