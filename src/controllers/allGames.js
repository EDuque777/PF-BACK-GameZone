const axios = require("axios");
const {Games} = require("../db")


const allGames = async(req, res) => {

    try {

        const {data} = await axios("https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=5AF0A95DF7221F7060FEF3660AAD4CCD")

        const apiGames = data.applist.apps.filter(game => game.name).slice(0, 50);

        const dbGames = await Games.findAll({
            attributes: ['name', 'image'],
        })

        return res.status(200).json(apiGames);
        
    } catch (error) {

        res.status(404).send(error.message)
        
    }

}


module.exports = {
    allGames
}