const axios = require('axios');
const { Platforms } = require('../db.js');
require('dotenv').config();
const { URL } = process.env;
const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

const platformGames = async (req, res) => {
    
  try {

    const { data: appList } = await axios.get(URL);
    const idGames = appList.applist.apps.filter(app => app.name.length > 0).map(app => app.appid);

    const platformsSet = new Set();

    for (let i = 0; i <= 20; i++) {
      const { data } = await axios.get(`${gameUrl}${idGames[i]}`);
      const info = data[idGames[i].toString()].data;
      if (info && info.platforms) {
        const platforms = info.platforms;
        if (platforms.windows) platformsSet.add('windows');
        if (platforms.mac) platformsSet.add('mac');
        if (platforms.linux) platformsSet.add('linux');
      }
    }


    for (const platform of platformsSet) {
        await Platforms.create({ platform: platform });
    }

    const dbGames = await Platforms.findAll({})

    return res.status(200).json(dbGames);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    platformGames
}
