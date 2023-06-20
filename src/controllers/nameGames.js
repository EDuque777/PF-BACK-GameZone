// const {Games, Developers, Publishers, Languages, Platforms, Genres, Categories} = require("../db")
// const Sequelize = require('sequelize');
// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;

// const nameGames = async(req, res) => {

//     try {

//         const {name} = req.query;

//         const { data: appList } = await axios.get(URL);
//         const idGames = appList.applist.apps.filter(app => app.name.length > 0);

//         const dbGames = await Games.findAll({
//             where: {name: {[Sequelize.Op.iLike]: `%${name}%`}},
//             include: [
//                 { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//                 { model: Publishers, attributes: ['publisher'], through: { attributes: [] } },
//                 { model: Languages, attributes: ['language'], through: { attributes: [] } },
//                 { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//                 { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//                 { model: Categories, attributes: ['category'], through: { attributes: [] } },
//             ]
//         })

//         const gamesWithId = dbGames.map(dbGame => {
//             const matchingGame = idGames.find(app => app.name === dbGame.name);
        
//               if (matchingGame) {
//                 return {
//                   ...dbGame.toJSON(),
//                   id: matchingGame.appid
//                 };
//               }
        
//               return dbGame.toJSON();
//             });
        
//             const gamesWithModifiedPrice = gamesWithId.map(game => {
//               if (game.price_overview === "Free") {
//                 game.price_overview = 0;
//               } else {
//                 const price = game.price_overview.replace(/[^0-9]/g, '');
//                 game.price_overview = (parseInt(price) * 0.00024).toFixed(2);
//             }
//               return game;
//             });
        
//             return res.status(200).json(gamesWithModifiedPrice);

//     } catch (error) {

//         res.status(404).send(error.message);
    
//     }

// }

// module.exports = {
//     nameGames
// }


const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

const nameGames = async (req, res) => {
const { name } = req.query;
const justname = name[0];

try {
    const { data } = await axios.get(URL);
    const alldata = data.applist.apps;

    // Filtrar las coincidencias en base al nombre
    const filteredData = alldata.filter(game => game.name.toLowerCase().includes(justname.toLowerCase()));

    // Obtener los datos adicionales de cada juego
    const gamesWithData = await Promise.all(
      filteredData.slice(0, 14).map(async game => {
        const { appid } = game;
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        const gameData = response.data[appid].data;
        return { ...game, ...gameData };
      })
    );

    return res.status(200).json(gamesWithData);

  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  nameGames
};