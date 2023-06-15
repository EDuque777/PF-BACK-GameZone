const { Router } = require('express');
const { getAllGames, getGame, createGames, deleteGame, updateGame, banGame } = require('../controllers/games.controllers');

const router = Router();
// Ruta para tarer todos los Games
router.get('/games', getAllGames);
// Ruta para tarer un Game
router.get('/games/:id', getGame);
// Ruta para crear un Game
router.post('/games', createGames);
// Ruta para eliminar un Games por id
router.delete('/games/:id', deleteGame);
// Ruta para actualizar datos un Game
router.put('/games/:id', updateGame);
// Ruta para banear un Game (borrado lógico)
router.put('/games/:gamesId/ban', banGame);



module.exports = router;