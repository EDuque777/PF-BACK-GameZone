const axios = require('axios');
const { Games } = require('../db')
require('dotenv').config();
const {URL} = process.env;

const saveGames = async(req, res) =>{
    try {
        const { data } = await axios(`${URL}`)
        console.log(data.apps);
    } catch (error) {
    }

}

module.exports = saveGames