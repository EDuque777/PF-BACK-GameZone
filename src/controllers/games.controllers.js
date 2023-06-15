const { Games } = require('../db');

const getAllGames = async (req, res) => {
    try {
        const games = await Games.findAll();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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

const createGames = async (req, res) => {
    try {
        const { name, image, summary, healthScore, steps } = req.body
        result = await Games.findOrCreate({
            where: {
                name: name,
                type:type,
                required_age:required_age,
                is_free:is_free,
                detailed_description:detailed_description,
                abouth_the_game:abouth_the_game,
                short_description:short_description,
                release_date:release_date,
                coming_soon:coming_soon,
                support_info:support_info,
                metacritic:metacritic,
                price_overview:price_overview,
                header_image:header_image,
                user_name: user_name,
                capsule_image:capsule_image,
            }
        })
        res.status(200).json("Juego creado");
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

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

const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, summary, healthScore, steps } = req.body;
        const updateGame = await Games.update(
            {
                name: name,
                image: image,
                summary: summary,
                healthScore: healthScore,
                steps: steps
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

// Ruta para banear un usuario (borrado lógico)
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