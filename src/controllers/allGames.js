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




const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos } = require("../db");
const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

const allGames = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const { data: appList } = await axios.get(URL);
    const idGames = appList.applist.apps.filter(app => app.name.length > 0);
    const transformPrice = "https://v6.exchangerate-api.com/v6/48607dc5313e842c2268f92c/latest/USD";
    const { data: priceData } = await axios.get(transformPrice);
    const conversionRates = priceData.conversion_rates;

    const dbGames = await Games.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { model: Developers, attributes: ['developer'], through: { attributes: [] } },
        { model: Languages, attributes: ['language'], through: { attributes: [] } },
        { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
        { model: Genres, attributes: ['genre'], through: { attributes: [] } },
        { model: Categories, attributes: ['category'], through: { attributes: [] } },
        { model: Images, attributes: ['image'], through: { attributes: [] } },
        { model: Videos, attributes: ['video'], through: { attributes: [] } },
      ],
      offset: (page - 1) * limit,
      limit: limit
    });

    // const gameNames = dbGames.map(dbGame => dbGame.name);
    // console.log(gameNames);

      const gamesWithId = dbGames.map(dbGame => {
      const matchingGame = idGames.find(app => app.name == dbGame.name);

      if (matchingGame) {
        return {
          id: matchingGame.appid,
          ...dbGame.toJSON(),
        };
      }
      return null;
    });

    const filteredGames = gamesWithId.filter(game => game !== null);

    const gamesWithModifiedPrice = filteredGames.map(game => {
      if (game.price_overview === "Free") {
        game.price_overview = 0;
      } else {
        const currency01 = game.currency;
        if (currency01 !== "USD") {
          if (currency01 === "COP") {
            const currencyPrice = game.price_overview.replace(/[^0-9]/g, '');
            const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
            game.price_overview = convertedPrice;
          } else {
            const currencyPrice = game.price_overview.replace(/(\d)(?=(\d{3})+(?!\d))/g, '1.').replace(/.\d+$/, '').replace(/[^0-9]/g, '');
            const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
            game.price_overview = convertedPrice;
          }
        }
      }
      return game;
    });

    return res.status(200).json(gamesWithModifiedPrice);
  
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  allGames
};


