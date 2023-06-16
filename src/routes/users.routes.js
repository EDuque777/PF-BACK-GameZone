const { Router } = require('express');
const { getAllUsers, getUser, createUser, deleteUser, updateUser, banUser } = require('../controllers/users.controllers');


const router = Router();
// Ruta para tarer todos los usuario (borrado lógico)
router.get('/users', getAllUsers);
// Ruta para tarer un usuario (borrado lógico)
router.get('/users/:id', getUser);
// Ruta para crear un usuario (borrado lógico)
router.post('/users', createUser);
// Ruta para eliminar un usuario por id (borrado lógico)
router.delete('/users/:id', deleteUser);
// Ruta para actualizar datos un usuario (borrado lógico)
router.put('/users/:id', updateUser);
// Ruta para banear un usuario (borrado lógico)
router.put('/users/:userId/ban', banUser);



module.exports = router;