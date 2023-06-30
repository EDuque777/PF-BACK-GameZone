const NP = require('number-precision');
const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews } = require("../db");
require('dotenv').config();

const allGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
<<<<<<< HEAD
    const limit = parseInt(req.query.limit) || 14;

    // const { data: appList } = await axios.get(URL);
    // const idGames = appList.applist.apps.filter(app => app.name.length > 0);
    // const transformPrice = "https://v6.exchangerate-api.com/v6/41dc88c8603aac05c7a94eae/latest/USD";
    // const { data: priceData } = await axios.get(transformPrice);
    // const conversionRates = priceData.conversion_rates;
=======
    const limit = parseInt(req.query.limit) || 20;
>>>>>>> c0969c32983c6c71b04cd5e764c12387302edfd9

    const dbGames = await Games.findAll({
      attributes: { exclude: ["currency", "support_info", "abouth_the_game", "short_description"] },
      include: [
        { model: Developers, attributes: ['developer'], through: { attributes: [] } },
        { model: Languages, attributes: ['language'], through: { attributes: [] } },
        { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
        { model: Genres, attributes: ['genre'], through: { attributes: [] } },
        { model: Categories, attributes: ['category'], through: { attributes: [] } },
        { model: Images, attributes: ['image'], through: { attributes: [] } },
        { model: Videos, attributes: ['video'], through: { attributes: [] } },
        { model: Reviews, attributes: ['reviews', 'rating', 'date'], through: { attributes: [] } },
      ],
      offset: (page - 1) * limit,
      limit: limit
    });

    const gamesWithModifiedPrice = dbGames.map(game => {
      const gameCurrency = game.price_overview.slice(0, 3);
      const gamePrice = game.price_overview.slice(5).replace('.', '').replace(',', '.');

      if (game.price_overview === "Free") {
        game.price_overview = 0;
      } else if (gameCurrency === "COL") {
        const number = NP.times(gamePrice / 4177.5).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "CDN") {
        const number = NP.times(gamePrice / 1.32).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "¥") {
        const number = NP.times(gamePrice, 0.0069).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "₫") {
        const number = NP.times(gamePrice, 0.000042).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "₹") {
        const number = NP.times(gamePrice, 0.012).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "ARS") {
        const number = NP.times(gamePrice / 266.5).toFixed(2);
        game.price_overview = Number(number);
      } else if (gameCurrency === "Mex") {
        const number = NP.times(gamePrice / 17.12).toFixed(2);
        game.price_overview = Number(number);
      }
      return game;
    });

    return res.status(200).json(gamesWithModifiedPrice);
  
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { allGames };
