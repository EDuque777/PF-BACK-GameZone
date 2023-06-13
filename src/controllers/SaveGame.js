const axios = require('axios');
const { Temperament } = require('../db')
require('dotenv').config();
const {URL} = process.env;

const getTemperament = async(req, res) =>{
    try {
        const { data } = await axios(`${URL}`)
        const temperament = data.map(dog => dog.temperament ? dog.temperament.split(',') : dog.temperament)
        const allTemperament = temperament.flat()
            for (let i = 0; i < allTemperament.length; i++) {
                if(allTemperament[i])
                await Temperament.findOrCreate({ where:
                    {temperament: allTemperament[i]}
                }) 
            }
            const allTemperaments = await Temperament.findAll({
                attributes: {exclude: ["id"]}
            })

        res.status(200).json(allTemperaments)
    } catch (error) {
        res.status(400).send({error: error.message})
    }

}

module.exports = getTemperament