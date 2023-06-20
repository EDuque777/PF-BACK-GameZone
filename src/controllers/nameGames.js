const {Games, Developers, Publishers, Languages, Platforms, Genres, Categories} = require("../db")
const Sequelize = require('sequelize');
const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

const nameGames = async(req, res) => {

    try {

        const {name} = req.query;

        const { data: appList } = await axios.get(URL);
        const idGames = appList.applist.apps.filter(app => app.name.length > 0);

        const dbGames = await Games.findAll({
            where: {name: {[Sequelize.Op.iLike]: `%${name}%`}},
            include: [
                { model: Developers, attributes: ['developer'], through: { attributes: [] } },
                { model: Publishers, attributes: ['publisher'], through: { attributes: [] } },
                { model: Languages, attributes: ['language'], through: { attributes: [] } },
                { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
                { model: Genres, attributes: ['genre'], through: { attributes: [] } },
                { model: Categories, attributes: ['category'], through: { attributes: [] } },
            ]
        })

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

}

module.exports = {
    nameGames
}


// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories } = require("../db");
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const nameGames = async (req, res) => {
//   try {
//     const { name } = req.query;

//     const { data: appList } = await axios.get(URL);
//     let idGames = appList.applist.apps.filter(app => app.name.toLowerCase().includes(name.toLowerCase()));

//     idGames = idGames.slice(0, 20);

//     const gamesWithModifiedPrice = idGames.map(game => {
//       if (game.price_overview === "Free") {
//         game.price_overview = 0;
//       } else {
//         const price = game.price_overview?.replace(/[^0-9]/g, '');
//         game.price_overview = price ? (parseInt(price) * 0.00024).toFixed(2) : 0;
//       }
//       return game;
//     });

//     return res.status(200).json(gamesWithModifiedPrice);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {
//   nameGames
// };



// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories } = require("../db");
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const nameGames = async (req, res) => {
//   try {
//     const { name } = req.query;

//     const { data: appList } = await axios.get(URL);
//     let idGames = appList.applist.apps.filter(app => app.name.toLowerCase().includes(name.toLowerCase()));

//     idGames = idGames.slice(0, 20);

//     const gamesWithModifiedPrice = idGames.map(game => {
//       if (game.price_overview === "Free") {
//         game.price_overview = 0;
//       } else {
//         const price = game.price_overview?.replace(/[^0-9]/g, '');
//         game.price_overview = price ? (parseInt(price) * 0.00024).toFixed(2) : 0;
//       }
//       return game;
//     });

//     return res.status(200).json(gamesWithModifiedPrice);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {
//   nameGames
// };


// const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories } = require("../db");
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const nameGames = async (req, res) => {
//   try {
//     const { data: appList } = await axios.get(URL);
//     const idGames = appList.applist.apps.filter(app => app.name.length > 0);

//     const { name } = req.query;
//     const searchTerm = name.toLowerCase();

//     const gamesInfo = [];

//     for (let i = 0; i <= 200; i++) {
//       const { data } = await axios.get(`${gameUrl}${idGames[i].appid}`);
//       const info = data[idGames[i].appid.toString()].data;
//       if (info && info.name.toLowerCase().includes(searchTerm)) {
//         const activePlatforms = Object.keys(info.platforms).filter(platform => info.platforms[platform]);
//         const platformNames = activePlatforms.map(platform => platform.charAt(0).toUpperCase() + platform.slice(1));
//         const newGame = {
//           name: info.name || 'Unknown',
//           type: info.type || 'Unknown',
//           required_age: info.required_age || 0,
//           is_free: info.is_free,
//           short_description: info.short_description || 'No description available',
//           detailed_description: info.detailed_description || 'No description available',
//           abouth_the_game: info.about_the_game || 'No description available',
//           release_date: info.release_date.date,
//           metacritic: info.metacritic ? info.metacritic.score : 0,
//           coming_soon: info.release_date.coming_soon,
//           price_overview: info.price_overview ? info.price_overview.final_formatted : 'Free',
//           support_info: info.support_info || 'No support information available',
//           capsule_image: info.capsule_image,
//           header_image: info.header_image,
//           platforms: platformNames,
//           categories: info.categories,
//           genres: info.genres,
//           developers: info.developers,
//           publishers: info.publishers,
//           supported_languages: info.supported_languages
//         };

//         gamesInfo.push(newGame);
//       }

//       if (gamesInfo.length === 20) {
//         break;
//       }
//     }

//     return res.status(200).json(gamesInfo); 
    
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {
//   nameGames
// };


