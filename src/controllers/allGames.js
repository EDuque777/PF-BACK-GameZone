<<<<<<< HEAD
const NP = require('number-precision');
const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews } = require("../db");
=======
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




// const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos } = require("../db");
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;

// const allGames = async (req, res) => {
//   try {

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 15;

//     const { data: appList } = await axios.get(URL);
//     const idGames = appList.applist.apps.filter(app => app.name.length > 0);
//     const transformPrice = "https://v6.exchangerate-api.com/v6/d4fa1b58267ebef392077018/latest/USD";
//     const { data: priceData } = await axios.get(transformPrice);
//     const conversionRates = priceData.conversion_rates;

//     const dbGames = await Games.findAll({
//       attributes: { exclude: ['id'] },
//       include: [
//         { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//         { model: Languages, attributes: ['language'], through: { attributes: [] } },
//         { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//         { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//         { model: Categories, attributes: ['category'], through: { attributes: [] } },
//         { model: Images, attributes: ['image'], through: { attributes: [] } },
//         { model: Videos, attributes: ['video'], through: { attributes: [] } },
//       ],
//       offset: (page - 1) * limit,
//       limit: limit
//     });

//     // const gameNames = dbGames.map(dbGame => dbGame.name);
//     // console.log(gameNames);

//       const gamesWithId = dbGames.map(dbGame => {
//       const matchingGame = idGames.find(app => app.name == dbGame.name);

//       if (matchingGame) {
//         return {
//           id: matchingGame.appid,
//           ...dbGame.toJSON(),
//         };
//       }
//       return null;
//     });

//     const filteredGames = gamesWithId.filter(game => game !== null);

//     const gamesWithModifiedPrice = filteredGames.map(game => {
//       if (game.price_overview === "Free") {
//         game.price_overview = 0;
//       } else {
//         const currency01 = game.currency;
//         if (currency01 !== "USD") {
//           if (currency01 === "COP") {
//             const currencyPrice = game.price_overview.replace(/[^0-9]/g, '');
//             const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
//             game.price_overview = convertedPrice;
//           } else {
//             const currencyPrice = game.price_overview.replace(/(\d)(?=(\d{3})+(?!\d))/g, '1.').replace(/.\d+$/, '').replace(/[^0-9]/g, '');
//             const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
//             game.price_overview = convertedPrice;
//           }
//         }
//       }
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
>>>>>>> 21936498aabd7929a29405bd384427fcc11094c9
require('dotenv').config();

const allGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

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
        console.log(number)
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

<<<<<<< HEAD
module.exports = { allGames };
=======
module.exports = {
  allGames
};








// const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos } = require("../db");
// const axios = require('axios');
// require('dotenv').config();

// const allGames = async (req, res) => {
//   try {

//     // const page = parseInt(req.query.page) || 1;
//     // const limit = parseInt(req.query.limit) || 15;

//     const transformPrice = "https://v6.exchangerate-api.com/v6/d4fa1b58267ebef392077018/latest/USD";
//     const { data: priceData } = await axios.get(transformPrice);
//     const conversionRates = priceData.conversion_rates;

//     const dbGames = await Games.findAll({
//       attributes: { exclude: ['id'] },
//       include: [
//         { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//         { model: Languages, attributes: ['language'], through: { attributes: [] } },
//         { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//         { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//         { model: Categories, attributes: ['category'], through: { attributes: [] } },
//         { model: Images, attributes: ['image'], through: { attributes: [] } },
//         { model: Videos, attributes: ['video'], through: { attributes: [] } },
//       ],
//       // offset: (page - 1) * limit,
//       // limit: limit
//     });

//     const gameNames = dbGames.map(dbGame => dbGame.name);
//     console.log(gameNames);

//     const filteredGames = dbGames.filter(game => game !== null);

//     const gamesWithModifiedPrice = filteredGames.map(game => {
//       if (game.price_overview === "Free") {
//         game.price_overview = 0;
//       } else {
//         const currency01 = game.currency;
//         if (currency01 !== "USD") {
//           if (currency01 === "COP") {
//             const currencyPrice = game.price_overview.replace(/[^0-9]/g, '');
//             const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
//             game.price_overview = convertedPrice;
//           } else {
//             const currencyPrice = game.price_overview.replace(/(\d)(?=(\d{3})+(?!\d))/g, '1.').replace(/.\d+$/, '').replace(/[^0-9]/g, '');
//             const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
//             game.price_overview = convertedPrice;
//           }
//         }
//       }
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


>>>>>>> 21936498aabd7929a29405bd384427fcc11094c9
