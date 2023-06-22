const {Publishers} = require("../db");


const publishersGames = async (req, res) => {
  try {

    const dbGames = await Publishers.findAll({});

    return res.status(200).json(dbGames);

  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
    publishersGames
};