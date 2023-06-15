const { Router } = require('express');
const { getAllGames, getGame, createGames, deleteGame, updateGame, banGame } = require('../controllers/games.controllers');


const router = Router();
// Ruta para tarer todos los usuario
router.get('/games', getAllGames);
// Ruta para tarer un usuario
router.get('/games/:id', getGame);
// Ruta para crear un usuario
router.post('/games', createGames);
// Ruta para eliminar un usuario por id
router.delete('/games/:id', deleteGame);
// Ruta para actualizar datos un usuario
router.put('/games/:id', updateGame);
// Ruta para banear un usuario (borrado lógico)
// router.put('/games/:gamesId/ban', banGame);



module.exports = router;