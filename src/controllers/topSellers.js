const axios = require('axios');
const url = 'https://store.steampowered.com/api/featuredcategories/';
const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Videos, Images } = require('../db.js');
const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

const topSellers = async (req, res) => {

  try {
    const { data: games} = await axios.get(url);
    let dataInfo = [games.top_sellers.items, games.specials.items, games.coming_soon.items, games.new_releases.items]
    let idGames = []
    idGames = dataInfo.map(game => game.map(type => type.id))
    idGames = idGames.flat()

    for (let i = 0; i < idGames.length; i++) {       
        const { data } = await axios.get(`${gameUrl}${idGames[i]}`);
        const info = data[idGames[i].toString()].data;

            if (info.name? info: false) {
            const existingGame = await Games.findOne({ where: { name: info.name } });
                if (existingGame) {
                    continue;
                }
        
        const newGame = {
            id: info.steam_appid,
            name: info.name || 'Unknown',
            type: info.type || 'Unknown',
            required_age: info.required_age || 0,
            is_free: info.is_free,
            detailed_description: info.detailed_description || 'No description available',
            release_date: info.release_date.date,
            coming_soon: info.release_date.coming_soon,
            currency: info.price_overview ? info.price_overview.currency : 'the currency does not exist',
            price_overview: info.price_overview ? info.price_overview.final_formatted : "Free",
            capsule_image: info.capsule_image,
            header_image: info.header_image,
            controller_support: info.controller_support? info.controller_support: null,
            ban: false,
            pc_requirements: info.pc_requirements || 'No requirements available',
            discounted: info?.price_overview?.discount_percent? true :false,
            discount_percent: info?.price_overview?.discount_percent? info.price_overview.discount_percent: 0
        };

        const game = await Games.create(newGame);

        const platformsSet = new Set();

        if (info.platforms) {
          const platforms = info.platforms;
          if (platforms.windows) platformsSet.add('windows');
          if (platforms.mac) platformsSet.add('mac');
          if (platforms.linux) platformsSet.add('linux');
        }

        const languagesSet = new Set();
        
        if (info && info.supported_languages) {
          const languages = info?.supported_languages?.split(', ');
          languages.map(language => { if (/^[a-zA-Z\s-]+$/.test(language)) { languagesSet.add(language);
            }
          });
        }
        
        for (const language of languagesSet) {
          const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
          await game.addLanguages(relationLanguage[0]);
        }
        
        for (const platform of platformsSet) {
          const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
          await game.addPlatforms(relationPlatforms[0]);
        }

        for (let i = 0; i < info?.genres?.length; i++) {
            const relation = await Genres.findOrCreate({ where: { genre: info.genres[i].description } } )
            await game.addGenres(relation[0])
        }

        for (let i = 0; i < info?.publishers?.length; i++) {
            const relation = await Publishers.findOrCreate({ where: { publisher: info.publishers[i] } } )
            await game.addPublishers(relation[0])
        }

        for (let i = 0; i < info?.developers?.length; i++) {
            const relation = await Developers.findOrCreate({ where: { developer: info.developers[i] } });
            await game.addDevelopers(relation[0])
        }

        for (let i = 0; i < info?.categories?.length; i++) {
            const relation = await Categories.findOrCreate({ where: { category: info.categories[i].description } });
            await game.addCategories(relation[0])
        }

        for (let i = 0; i < info?.screenshots?.length; i++) {
            const relation = await Images.findOrCreate({ where: { image: info.screenshots[i].path_full } });
            await game.addImages(relation[0])
        }

        for (let i = 0; i < info?.movies?.length; i++) {
            const relation = await Videos.findOrCreate({ where: { video: info.movies[i].mp4['480'] } });
            await game.addVideos(relation[0])
        }

      }
    }

    return res.status(200).json("¡Juegos guardados exitosamente!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = topSellers;