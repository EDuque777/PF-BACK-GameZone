const {Games, Developers, Publishers, Languages, Platforms, Genres, Categories} = require("../db")

const allGames = async(req, res) => {

    try {

        const dbGames = await Games.findAll({
            include: [
              { model: Developers, attributes: ['developer'], through: { attributes: [] } },
              { model: Publishers, attributes: ['publisher'], through: { attributes: [] } },
              { model: Languages, attributes: ['language'], through: { attributes: [] } },
              { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
              { model: Genres, attributes: ['genre'], through: { attributes: [] } },
              { model: Categories, attributes: ['category'], through: { attributes: [] } },
            ]
        });

        return res.status(200).json(dbGames);

    } catch (error) {

        res.status(404).send(error.message);
    
    }

}

module.exports = {
    allGames
}