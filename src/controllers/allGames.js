// const {Games, Developers, Publishers, Languages, Platforms, Genres, Categories} = require("../db")
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;

// const allGames = async(req, res) => {

//     try {

//         const { data: appList } = await axios.get(URL);
//         const idGames = appList.applist.apps.filter(app => app.name.length > 0);

//         const dbGames = await Games.findAll({
//             attributes: { exclude: ['id'] },
//             include: [
//               { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//               { model: Publishers, attributes: ['publisher'], through: { attributes: [] } },
//               { model: Languages, attributes: ['language'], through: { attributes: [] } },
//               { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//               { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//               { model: Categories, attributes: ['category'], through: { attributes: [] } },
//             ]
//         });

//         const gamesWithId = dbGames.map(dbGame => {
//         const matchingGame = idGames.find(app => app.name === dbGame.name);
      
//             if (matchingGame) {
//               return {
//                 ...dbGame.toJSON(),
//                 id: matchingGame.appid
//               };
//             }
      
//             return dbGame.toJSON();
//           });

//           return res.status(200).json(gamesWithId);


//     } catch (error) {

//         res.status(404).send(error.message);
    
//     }

// }

// module.exports = {
//     allGames
// }



const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Images, Videos } = require("../db");
const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

const allGames = async (req, res) => {
  try {
    const { data: appList } = await axios.get(URL);
    const idGames = appList.applist.apps.filter(app => app.name.length > 0);

    const dbGames = await Games.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { model: Developers, attributes: ['developer'], through: { attributes: [] } },
        { model: Publishers, attributes: ['publisher'], through: { attributes: [] } },
        { model: Languages, attributes: ['language'], through: { attributes: [] } },
        { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
        { model: Genres, attributes: ['genre'], through: { attributes: [] } },
        { model: Categories, attributes: ['category'], through: { attributes: [] } },
        { model: Images, attributes: ['image'], through: { attributes: [] } },
        { model: Videos, attributes: ['video'], through: { attributes: [] } },
      ]
    });

    const gamesWithId = dbGames.map(dbGame => {
    const matchingGame = idGames.find(app => app.name === dbGame.name);

      if (matchingGame) {
        return {
          ...dbGame.toJSON(),
          id: matchingGame.appid
        };
      }

      return dbGame.toJSON();
    });

    const gamesWithModifiedPrice = gamesWithId.map(game => {
      if (game.price_overview === "Free") {
        game.price_overview = 0;
      } else {
        const price = game.price_overview.replace(/[^0-9]/g, '');
        game.price_overview = (parseInt(price) * 0.00024).toFixed(2);
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




// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories } = require("../db");
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const allGames = async (req, res) => {
//   try {
    
//     const {data} = await axios.get(URL)

//     return res.status(200).json(data); 
    
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {
//   allGames
// };