const {Games} = require("../db")
const Sequelize = require('sequelize');

const nameGames = async(req, res) => {

    try {

        const {name} = req.query;

        const dbGames = await Games.findAll({
            where: {name: {[Sequelize.Op.iLike]: `%${name}%`}}
        })

        return res.status(200).json(dbGames);

    } catch (error) {

        res.status(404).send(error.message);
    
    }

}

module.exports = {
    nameGames
}