// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Images, Videos } = require("../db");
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;

// const allGames = async (req, res) => {
//   try {

//     const { data: appList } = await axios.get(URL);
//     const idGames = appList.applist.apps.filter(app => app.name.length > 0);
//     const transformPrice = "https://v6.exchangerate-api.com/v6/17a32b390da20882cc9f437f/latest/USD";
//     const { data: priceData } = await axios.get(transformPrice);
//     const conversionRates = priceData.conversion_rates;

//     const dbGames = await Games.findAll({
//       attributes: { exclude: ['id'] },
//       include: [
//         { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//         { model: Publishers, attributes: ['publisher'], through: { attributes: [] } },
//         { model: Languages, attributes: ['language'], through: { attributes: [] } },
//         { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//         { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//         { model: Categories, attributes: ['category'], through: { attributes: [] } },
//         { model: Images, attributes: ['image'], through: { attributes: [] } },
//         { model: Videos, attributes: ['video'], through: { attributes: [] } },
//       ]
//     });
    
//       const gamesWithId = dbGames.map(dbGame => {
//       const matchingGame = idGames.find(app => app.name == dbGame.name);

//       if (matchingGame) {
//         return {
//           id: matchingGame.appid,
//           ...dbGame.toJSON(),
//         };
//       }
//       return null;
//       //return dbGame.toJSON();
//     });

//     const filteredGames = gamesWithId.filter(game => game !== null);

//     const gamesWithModifiedPrice = filteredGames.map(game => {
//       if (game.price_overview === "Free") {
//         game.price_overview = 0;
//       } 
//       else {
//         const currency01 = game.currency;
//         if(currency01 !== "USD"){
//         const currency01 = game.currency;
//         if(currency01 === "COP"){
//           const currencyPrice = game.price_overview.replace(/[^0-9]/g, '');
//           const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
//           game.price_overview = convertedPrice;
//         }
//         else{
//           const currencyPrice = game.price_overview.replace(/(\d)(?=(\d{3})+(?!\d))/g, '1.').replace(/.\d+$/, '').replace(/[^0-9]/g, '');
//           const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
//           game.price_overview = convertedPrice;
//         }
//       }
//     }
//       return game;
//     });

//     return res.status(200).json(gamesWithModifiedPrice);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {
//   allGames
// };




const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews } = require("../db");
require('dotenv').config();

const allGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const dbGames = await Games.findAll({
      attributes: { exclude: ["metacritic", "currency", "support_info", "is_free", "type", "abouth_the_game", "short_description"] },
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

    const gameNames = dbGames.map(dbGame => dbGame.name);
    console.log(gameNames);

    const gamesWithModifiedPrice = dbGames.map(game => {
            const gameCurrency = game.price_overview.slice(0, 3);
            const gameCurrency01 = game.price_overview.slice(0, 1);
            const gameCurrency02 = game.price_overview.includes("₫");
            const gameCurrency03 = game.price_overview.slice(0, 1);
            const gamePrice = game.price_overview.slice(5, 20);
            const gamePrice01 = game.price_overview.slice(2, 20);
            const gamePrice02 = game.price_overview.replace(/\D/g, '');
            const gamePrice03 = game.price_overview.slice(2, 20);
            const gamePrice04 = game.price_overview.slice(5, 20);
            console.log(gameCurrency)
            console.log(gamePrice)
            if (game.price_overview === "Free") {
              game.price_overview = 0;
              console.log(game.price_overview)
            }
            else if(gameCurrency === "COL"){
              const currencyPrice = parseFloat(gamePrice).toFixed(3)
              const currencyPrice01 = currencyPrice.replace('.', ''); 
              game.price_overview = (currencyPrice01 * 0.00024).toFixed(2)
              console.log(game.price_overview)
            }
            else if(gameCurrency === "CDN"){
              const currencyPrice = parseFloat(gamePrice).toFixed(2)
              game.price_overview = (currencyPrice * 0.76).toFixed(2)
              console.log(game.price_overview)
            }
            else if(gameCurrency01 === "¥"){
              const currencyPrice = parseFloat(gamePrice01).toFixed(2)
              game.price_overview = (currencyPrice * 0.0069).toFixed(2)
              console.log(game.price_overview)
            }
            else if(gameCurrency02 === true){
              game.price_overview = (gamePrice02 * 0.000042).toFixed(2)
              console.log(game.price_overview)
            }
            else if(gameCurrency03 === "₹"){
              game.price_overview = (gamePrice03 * 0.012).toFixed(2)
              console.log(game.price_overview)
            }
            else if(gameCurrency === "ARS"){
              const currencyPrice = gamePrice04.replace(/[,.]/g, '');
              game.price_overview = (currencyPrice * 0.0039).toFixed(2);
              console.log(game.price_overview);
            }
            else if(gameCurrency === "Mex"){
              const currencyPrice = parseFloat(gamePrice).toFixed(3)
              game.price_overview = (currencyPrice * 0.059).toFixed(2)
              console.log(game.price_overview)
            }
            else if(gameCurrency === "PEN"){

            }
            return game;
          });

    return res.status(200).json(gamesWithModifiedPrice);
  
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {allGames}
