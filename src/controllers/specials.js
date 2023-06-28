const axios = require('axios');
const { Games, Images, Videos, Reviews } = require('../db.js');

const url = 'https://store.steampowered.com/api/featuredcategories/';

const specials = async (req, res) => {
  try {
    const { data } = await axios.get(url);
    const info = data.specials.items;

    let specialAll = [];
    if (info) {
      for (const gameInfo of info) {
        const existingGame = await Games.findOne({ where: { name: gameInfo.name } });
        if (existingGame) {
          continue;
        }
        const newGame = {
          id: gameInfo.id,
          name: gameInfo.name,
          type: 'Unknown',
          required_age: 0,
          is_free: false,
          detailed_description: 'Unknown',
          release_date: 'Unknown',
          coming_soon: false,
          currency: 'Unknown',
          price_overview: gameInfo.final_price,
          capsule_image: gameInfo.small_capsule_image || 'Unknown',
          header_image: gameInfo.header_image || 'Unknown',
          controller_support: gameInfo.controller_support || 'Unknown',
          ban: false,
          pc_requirements: 'Unknown',
          discounted: gameInfo.discounted,
          discount_percent: gameInfo.discount_percent || 0
        };

        const game = await Games.create(newGame);
        specialAll.push(game);
      }
    }

    const dbGames = await Games.findAll({
      attributes: { exclude: ["metacritic", "currency", "support_info", "is_free", "type", "abouth_the_game", "short_description"] },
      include: [
        { model: Images, attributes: ['image'], through: { attributes: [] } },
        { model: Videos, attributes: ['video'], through: { attributes: [] } },
        { model: Reviews, attributes: ['reviews', 'rating', 'date'], through: { attributes: [] } },
      ],
    });

    const gamesWithDiscount = dbGames.filter(game => game.discounted === true);

    const gamesWithModifiedPrice = gamesWithDiscount.map(game => {
      const gameCurrency = game.price_overview.slice(0, 3);
      const gameCurrency01 = game.price_overview.slice(0, 1);
      const gameCurrency02 = game.price_overview.includes("₫");
      const gameCurrency03 = game.price_overview.slice(0, 1);
      const gamePrice = game.price_overview.slice(5, 20);
      const gamePrice01 = game.price_overview.slice(2, 20);
      const gamePrice02 = game.price_overview.replace(/\D/g, '');
      const gamePrice03 = game.price_overview.slice(2, 20);
      const gamePrice04 = game.price_overview.slice(5, 20);
    //   console.log(gameCurrency);
    //   console.log(gamePrice);
      if (game.price_overview === "Free") {
        game.price_overview = 0;
        console.log(game.price_overview);
      } else if (gameCurrency === "COL") {
        const currencyPrice = parseFloat(gamePrice).toFixed(3);
        const currencyPrice01 = currencyPrice.replace('.', '');
        const number = (currencyPrice01 * 0.00024).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      } else if (gameCurrency === "CDN") {
        const currencyPrice = parseFloat(gamePrice).toFixed(2);
        const number = (currencyPrice * 0.76).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      } else if (gameCurrency01 === "¥") {
        const currencyPrice = parseFloat(gamePrice01).toFixed(2);
        const number = (currencyPrice * 0.0069).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      } else if (gameCurrency02 === true) {
        const number = (gamePrice02 * 0.000042).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      } else if (gameCurrency03 === "₹") {
        const number = (gamePrice03 * 0.012).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      } else if (gameCurrency === "ARS") {
        const currencyPrice = gamePrice04.replace(/,.$/g, '').replace('.', '');
        console.log(currencyPrice);
        const number = (currencyPrice * 0.0039).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      } else if (gameCurrency === "Mex") {
        const currencyPrice = parseFloat(gamePrice).toFixed(3);
        const number = (currencyPrice * 0.059).toFixed(2);
        game.price_overview = Number(number);
        console.log(game.price_overview);
      }
      return game;
    });

    return res.status(200).json(gamesWithModifiedPrice);

    //res.status(200).json(specialAll);

  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = specials;