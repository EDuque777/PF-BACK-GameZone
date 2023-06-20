const axios = require('axios');
const { Games, Developers, Publishers, Languages, Platforms, Genres, Categories, Videos, Images } = require('../db.js');
require('dotenv').config();
const { URL } = process.env;
const gameUrl = 'https://store.steampowered.com/api/appdetails?appids=';

const saveGames = async (req, res) => {
  try {
    const { data: appList } = await axios.get(URL);
    const idGames = appList.applist.apps.filter(app => app.name.length > 0);

    for (let i = 0; i <= 6; i++) {
      const { data } = await axios.get(`${gameUrl}${idGames[i].appid}`);
      const info = data[idGames[i].appid.toString()].data;
      if (info) {
        const newGame = {
          name: info.name || 'Unknown',
          type: info.type || 'Unknown',
          required_age: info.required_age || 0,
          is_free: info.is_free,
          short_description: info.short_description || 'No description available',
          detailed_description: info.detailed_description || 'No description available',
          about_the_game: info.about_the_game? info.about_the_game :'No description available',
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
          const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
          await game.addPlatforms(relationPlatforms[0]);
        }
        
        const genresSet = new Set();
        
        if (info && info.genres) {
          const genres = info.genres;
          genres.map(genre => genresSet.add(genre.description));
        }
        
        for (const genre of genresSet) {
          const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
          await game.addGenres(relationGenres[0]);
        }
        
        const publishersSet = new Set();
        
        if (info && info.publishers) {
          const publishers = info.publishers;
          publishers.map(publisher => publishersSet.add(publisher));
        }
        
        for (const publisher of publishersSet) {
          const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
          await game.addPublishers(relationPublisher[0]);
        }
        
        const developersSet = new Set();
        
        if (info && info.developers) {
          const developers = info.developers;
          developers.map(developer => developersSet.add(developer));
        }
        
        for (const developer of developersSet) {
          const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
          await game.addDevelopers(relationDeveloper[0]);
        }
        
        const languagesSet = new Set();
        
        if (info && info.supported_languages) {
          const languages = info.supported_languages.split(',');
          languages.map(language => { if (/^[a-zA-Z\s-]+$/.test(language)) { languagesSet.add(language);
            }
          });
        }
        
        for (const language of languagesSet) {
          const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
          await game.addLanguages(relationLanguage[0]);
        }
        
        const categoriesSet = new Set();
        
        if (info && info.categories) {
          const categories = info.categories;
          categories.map(category => categoriesSet.add(category.description));
        }
        
        for (const category of categoriesSet) {
          const relationCategory = await Categories.findOrCreate({ where: { category: category } });
          await game.addCategories(relationCategory[0]);
        }

        const imagesSet = new Set()

        if(info && info.screenshots) {
          const images = info.screenshots;
          images.map(images => imagesSet.add(images.path_full))
        }

        for(const image of imagesSet) {
          const relationImage = await Images.findOrCreate({where: { image: image}})
          await game.addImages(relationImage[0])
        }
        
        const videoSet = new Set()

        if(info && info.movies) {
          const videos = info.movies;
          videos.map(video => imagesSet.add(video.mp4[480]))
        }

        for(const video of videoSet) {
          const relationVideo = await Videos.findOrCreate({where: { video: video}})
          await game.addVideos(relationVideo[0])
        }

      }
    }
    const dbGames = await Games.findAll();
    return res.status(200).json(dbGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = saveGames;