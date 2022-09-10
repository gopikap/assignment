const userRepository = require("../repositories/userRepository");

const getDataHandler = {};

getDataHandler.getData = async function () {    
    const response = await userRepository.getAll();
    return JSON.parse(JSON.stringify(response));
}

module.exports = getDataHandler;
