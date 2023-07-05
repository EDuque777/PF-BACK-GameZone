// const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews } = require("../db");
// require('dotenv').config();

// const allGames = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 3;
//     const limit = parseInt(req.query.limit) || 7;

//     const dbGames = await Games.findAll({
//       attributes: { exclude: ["metacritic", "currency", "support_info", "is_free", "type", "abouth_the_game", "short_description"] },
//       include: [
//         { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//         { model: Languages, attributes: ['language'], through: { attributes: [] } },
//         { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//         { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//         { model: Categories, attributes: ['category'], through: { attributes: [] } },
//         { model: Images, attributes: ['image'], through: { attributes: [] } },
//         { model: Videos, attributes: ['video'], through: { attributes: [] } },
//         { model: Reviews, attributes: ['reviews', 'rating', 'date'], through: { attributes: [] } },
//       ],
//       offset: (page - 1) * limit,
//       limit: limit
//     });

//     const gameNames = dbGames.map(dbGame => dbGame.name);
//     console.log(gameNames);

//     const gamesWithModifiedPrice = dbGames.map(game => {
//             const gameCurrency = game.price_overview.slice(0, 3);
//             const gameCurrency01 = game.price_overview.slice(0, 1);
//             const gameCurrency02 = game.price_overview.includes("₫");
//             const gameCurrency03 = game.price_overview.slice(0, 1);
//             const gamePrice = game.price_overview.slice(5, 20);
//             const gamePrice01 = game.price_overview.slice(2, 20);
//             const gamePrice02 = game.price_overview.replace(/\D/g, '');
//             const gamePrice03 = game.price_overview.slice(2, 20);
//             const gamePrice04 = game.price_overview.slice(5, 20);
//             console.log(gameCurrency)
//             console.log(gamePrice)
//             if (game.price_overview === "Free") {
//               game.price_overview = 0;
//               console.log(game.price_overview)
//             }
//             else if(gameCurrency === "COL"){
//               const currencyPrice = parseFloat(gamePrice).toFixed(3)
//               const currencyPrice01 = currencyPrice.replace('.', ''); 
//               const number = (currencyPrice01 * 0.00024).toFixed(2)
//               game.price_overview = Number(number)
//               console.log(game.price_overview)
//             }
//             else if(gameCurrency === "CDN"){
//               const currencyPrice = parseFloat(gamePrice).toFixed(2)
//               const number = (currencyPrice * 0.76).toFixed(2)
//               game.price_overview = Number(number)
//               console.log(game.price_overview)
//             }
//             else if(gameCurrency01 === "¥"){
//               const currencyPrice = parseFloat(gamePrice01).toFixed(2)
//               const number = (currencyPrice * 0.0069).toFixed(2)
//               game.price_overview = Number(number)
//               console.log(game.price_overview)
//             }
//             else if(gameCurrency02 === true){
//               const number = (gamePrice02 * 0.000042).toFixed(2)
//               game.price_overview = Number(number)
//               console.log(game.price_overview)
//             }
//             else if(gameCurrency03 === "₹"){
//               const number = (gamePrice03 * 0.012).toFixed(2)
//               game.price_overview = Number(number)
//               console.log(game.price_overview)
//             }
//             else if(gameCurrency === "ARS"){
//               const currencyPrice = gamePrice04.replace(/,.*$/g, '').replace('.', '');
//               console.log(currencyPrice)
//               const number = (currencyPrice * 0.0039).toFixed(2);
//               game.price_overview = Number(number)
//               console.log(game.price_overview);
//             }
//             else if(gameCurrency === "Mex"){
//               const currencyPrice = parseFloat(gamePrice).toFixed(3)
//               const number = (currencyPrice * 0.059).toFixed(2)
//               game.price_overview = Number(number)
//               console.log(game.price_overview)
//             }
//             return game;
//           });

//     return res.status(200).json(gamesWithModifiedPrice);
  
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {allGames}




const NP = require('number-precision');
const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews } = require("../db");
require('dotenv').config();

const allGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

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
      console.log(game.price_overview)
      if (game.price_overview === "Free") {
        game.price_overview = 0;
      } else if (gameCurrency === "COL") {
        const number = NP.times(gamePrice / 4177.5).toFixed(2);
        console.log(number)
        game.price_overview = Number(number);
      } else if (gameCurrency === "CDN") {
        const number = NP.times(gamePrice, 0.76).toFixed(2);
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
        console.log(number)
        game.price_overview = Number(number);
      } else if (gameCurrency === "Mex") {
        const number = NP.times(gamePrice, 0.059).toFixed(2);
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
