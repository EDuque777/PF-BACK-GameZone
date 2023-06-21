const {Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Images, Videos} = require("../db")
const Sequelize = require('sequelize');
const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

const nameGames = async (req, res) => {
const { name } = req.query;
const justname = name;
console.log(name)
console.log(justname)

try {
    const { data } = await axios.get(URL);
    const alldata = data.applist.apps;

    // Filtrar las coincidencias en base al nombre
    const filteredData = alldata.filter(game => game.name.toLowerCase().includes(justname.toLowerCase()));

        const { data: appList } = await axios.get(URL);
        const idGames = appList.applist.apps.filter(app => app.name.length > 0);
        const transformPrice = "https://v6.exchangerate-api.com/v6/17a32b390da20882cc9f437f/latest/USD";
        const { data: priceData } = await axios.get(transformPrice);
        const conversionRates = priceData.conversion_rates;

        const dbGames = await Games.findAll({
            where: {name: {[Sequelize.Op.iLike]: `%${name}%`}},
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
        }
    );

        const gamesWithId = dbGames.map(dbGame => {
            const matchingGame = idGames.find(app => app.name === dbGame.name);
        
              if (matchingGame) {
                return {
                  id: matchingGame.appid,
                  ...dbGame.toJSON(),
                  
                };
              }
              return dbGame.toJSON();
            });
        
            const gamesWithModifiedPrice = gamesWithId.map(game => {
              if (game.price_overview === "Free") {
                game.price_overview = 0;
              } 
              else {
                // const currencyPrice = game.price_overview.replace(/[^0-9]/g, '');//.replace(/[^0-9]/g, '');
                // console.log(currencyPrice)
                // const currency01 = game.currency;
                // const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
                // console.log(convertedPrice)
                // game.price_overview = convertedPrice;
                const currency01 = game.currency;
                console.log(currency01)
                if(currency01 !== "USD"){
                const currency01 = game.currency;
                if(currency01 === "COP"){
                  const currencyPrice = game.price_overview.replace(/[^0-9]/g, '');
                  // console.log(currencyPrice)
                  const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
                  // console.log(convertedPrice)
                  game.price_overview = convertedPrice;
                }
                else{
                  const currencyPrice = game.price_overview.replace(/(\d)(?=(\d{3})+(?!\d))/g, '1.').replace(/.\d+$/, '').replace(/[^0-9]/g, '');
                  //(/\.(?=.*\.)/g, '')
                  //(/(\d)(?=(\d{3})+(?!\d))/g, '1.')
                  console.log(currencyPrice)
                  const convertedPrice = (currencyPrice / conversionRates[currency01]).toFixed(2);
                  console.log(convertedPrice)
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
    nameGames
}



// const axios = require('axios');
// require('dotenv').config();
// const { URL } = process.env;

// const nameGames = async (req, res) => {
// const { name } = req.query;
// const justname = name;

// try {
//     const { data } = await axios.get(URL);
//     const alldata = data.applist.apps;

//     // Filtrar las coincidencias en base al nombre
//     const filteredData = alldata.filter(game => game.name.toLowerCase().includes(justname.toLowerCase()));

//     // Obtener los datos adicionales de cada juego
//     const gamesWithData = await Promise.all(
//       filteredData.slice(0, 14).map(async game => {
//         const { appid } = game;
//         const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
//         const gameData = response.data[appid].data;
//         return { ...game, ...gameData };
//       })
//     );

//     return res.status(200).json(gamesWithData);

//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };

// module.exports = {
//   nameGames
// };