// const axios = require('axios');
// const { Games, Platforms } = require('../db.js');
// require('dotenv').config();
// const { URL } = process.env;
// const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

// const saveGames = async (req, res) => {
//   try {
//     const { data: appList } = await axios.get(URL);
//     const idGames = appList.applist.apps.filter(app => app.name.length > 0).map(app => app.appid);

//     for (let i = 0; i <= 20; i++) {
//       const { data } = await axios.get(`${gameUrl}${idGames[i]}`);
//       const info = data[idGames[i].toString()].data;
//       if (info) {
//         const newGame = {
//           name: info.name || 'Unknown',
//           type: info.type || 'Unknown',
//           required_age: info.required_age || 0,
//           is_free: info.is_free,
//           short_description: info.short_description || 'No description available',
//           detailed_description: info.detailed_description || 'No description available',
//           about_the_game: info.about_the_game || 'No description available',
//           release_date: info.release_date.date,
//           metacritic: info.metacritic?info.metacritic.score: 0,
//           coming_soon: info.release_date.coming_soon,
//           price_overview: info.price_overview? info.price_overview.final_formatted: 'Free',
//           support_info: info.support_info || 'No support information available',
//           capsule_image: info.capsule_image,
//           header_image: info.header_image,
//         };
//         await Games.create(newGame);
//       } 
//     }

//     const dbGames = await Games.findAll({})

//     return res.status(200).json(dbGames);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = saveGames;

const axios = require('axios');
const { Games, Platforms } = require('../db.js');
require('dotenv').config();
const { URL } = process.env;
const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

const saveGames = async (req, res) => {
  try {
    const { data: appList } = await axios.get(URL);
    const idGames = appList.applist.apps.filter(app => app.name.length > 0).map(app => app.appid);

    for (let i = 0; i <= 20; i++) {
      const { data } = await axios.get(`${gameUrl}${idGames[i]}`);
      const info = data[idGames[i].toString()].data;
      if (info) {
        const newGame = {
          name: info.name || 'Unknown',
          type: info.type || 'Unknown',
          required_age: info.required_age || 0,
          is_free: info.is_free,
          short_description: info.short_description || 'No description available',
          detailed_description: info.detailed_description || 'No description available',
          about_the_game: info.about_the_game || 'No description available',
          release_date: info.release_date.date,
          metacritic: info.metacritic ? info.metacritic.score : 0,
          coming_soon: info.release_date.coming_soon,
          price_overview: info.price_overview ? info.price_overview.final_formatted : 'Free',
          support_info: info.support_info || 'No support information available',
          capsule_image: info.capsule_image,
          header_image: info.header_image,
        };
        const game = await Games.create(newGame);

        const platformsSet = new Set();

        if (info && info.platforms) {
          const platforms = info.platforms;
          if (platforms.windows) platformsSet.add('windows');
          if (platforms.mac) platformsSet.add('mac');
          if (platforms.linux) platformsSet.add('linux');
        }

        for (const platform of platformsSet) {
          const relationPlatforms = await Platforms.findOrCreate({where:{ platform: platform }});
          await game.addPlatforms(relationPlatforms[0]);
        }

      }
    }

    const dbGames = await Games.findAll({})

    return res.status(200).json(dbGames);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = saveGames;
