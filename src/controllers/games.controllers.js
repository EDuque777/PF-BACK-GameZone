const { Games, Developers } = require('../db');
const imageDefault = "http://res.cloudinary.com/dcebtiiih/image/upload/v1687189921/images/1687189899005.png"
// Ruta para traer todos los Games creados (borrado lógico)
const getAllGames = async (req, res) => {
    try {
        const games = await Games.findAll();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Ruta para buscar un Game por ID creado (borrado lógico)
const getGame = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Games.findByPk(id,);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Ruta para crear un Game (borrado lógico)
const createGames = async (req, res) => {
    
    try {
        const { name, type, required_age, is_free, detailed_description, abouth_the_game, short_description, release_date, coming_soon,
            support_info, metacritic, price_overview, header_image, capsule_image, available, developers } = req.body
        
        const result = await Games.create({
                name: name,
                type: type,
                required_age: required_age,
                is_free: is_free,
                detailed_description: detailed_description,
                abouth_the_game: abouth_the_game,
                short_description: short_description,
                release_date: release_date,
                coming_soon: coming_soon,
                support_info: support_info,
                metacritic: metacritic,
                price_overview: price_overview,
                header_image: header_image,
                capsule_image: capsule_image,
                // available:available   *******
        })

        const developersSet = new Set();
        if (developers.length > 0) {
          developers.map(developer => developersSet.add(developer));
        }
        
        for (const developer of developersSet) {
          const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
          await result.addDevelopers(relationDeveloper[0]);
        }

        res.status(200).json("Juego creado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Ruta para eliminar un Game (borrado lógico)
const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGame = await Games.destroy({ where: { id: id } });
        if (deletedGame) {
            res.status(200).json({ message: 'Juego eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Ruta para actuliazr un Game por ID (borrado lógico)
const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, required_age, is_free, detailed_description, abouth_the_game, short_description, release_date, coming_soon, support_info, metacritic, price_overview, header_image, capsule_image, available } = req.body;
        const updateGame = await Games.update(
            {
                name: name,
                type: type,
                required_age: required_age,
                is_free: is_free,
                detailed_description: detailed_description,
                abouth_the_game: abouth_the_game,
                short_description: short_description,
                release_date: release_date,
                coming_soon: coming_soon,
                support_info: support_info,
                metacritic: metacritic,
                price_overview: price_overview,
                header_image: header_image,
                capsule_image: capsule_image,
                available: available
            },
            { where: { id: id } }
        );
        if (updateGame[0] === 1) {
            res.status(200).json({ message: 'Juego actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Juego no existe' });
    }
}

// Ruta para banear un Game (borrado lógico)
const banGame = async (req, res) => {
    try {
        const { gamesId } = req.params;
        const bannedGame = await Games.findByPk(userId);

        if (!bannedGame) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }

        bannedGame.status = 'baneado';
        bannedGame.bannedAt = new Date();
        await bannedGame.save();

        res.json({ message: 'Usuario baneado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al banear el usuario' });
    }
};
module.exports = {
    getAllGames,
    getGame,
    createGames,
    deleteGame,
    updateGame,
    banGame
};