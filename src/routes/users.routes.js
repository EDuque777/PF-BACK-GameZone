const { Router } = require('express');
const { getAllUsers, getUser, createUser, deleteUser, updateUser, banUser } = require('../controllers/users.controllers');


const router = Router();
// Ruta para tarer todos los usuario
router.get('/users', getAllUsers);
// Ruta para tarer un usuario
router.get('/users/:id', getUser);
// Ruta para crear un usuario
router.post('/users', createUser);
// Ruta para eliminar un usuario por id
router.delete('/users/:id', deleteUser);
// Ruta para actualizar datos un usuario
router.put('/users/:id', updateUser);
// Ruta para banear un usuario (borrado lógico)
router.put('/users/:userId/ban', banUser);



module.exports = router;