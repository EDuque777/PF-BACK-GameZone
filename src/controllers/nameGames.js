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