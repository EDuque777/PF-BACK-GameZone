const { Router } = require('express');
const  saveGames = require("../controllers/saveGames")
const {nameGames} = require("../controllers/nameGames")
const {allGames} = require("../controllers/allGames")
const {searchId} = require("../controllers/searchId")
const {platformGames} = require("../controllers/platformGames")
const comingSoon = require('../controllers/comingSoon')
const specials = require('../controllers/specials')
const topSellers = require('../controllers/topSellers')
const newReleases = require('../controllers/newReleases')
const { createAccount } = require("../controllers/createAccount.js")
const { logIn } = require("../controllers/logIn.js")
const { cerrarSesion } = require("../controllers/logout.js")
const { profileUser } = require("../controllers/profile.js")
const { validateToken } = require("../middlewares/validateToken.js")
const { upload, uploadPhoto } = require('../controllers/uploadPhoto');
//const {getRecipesId} = require("../controllers/getRecipesId")
//const {getRecipesName} = require("../controllers/getRecipesName");
//const {postRecipes} = require("../controllers/postRecipes")
//const {getDiets} = require("../controllers/getDiets")
//const {login} = require("../controllers/login")
const { getAllGames, getGame, createGames, deleteGame, updateGame, banGame } = require('../controllers/games.controllers');
const { getAllUsers, getUser, createUser, deleteUser, updateUser, banUser } = require('../controllers/users.controllers');

const router = Router();

router.get("/back/", (req, res) => {
    saveGames(req, res);
})

router.get("/allGames", (req, res) => {
    allGames(req, res);
})

router.get("/nameGames", (req, res) => {
    nameGames(req, res);
})

router.get("/search/:id", (req, res) => {
    searchId(req, res);
})

router.get("/platformGames", (req, res) => {
    platformGames(req, res);
})

router.get('/coming', (req, res) => {
    comingSoon(req, res)
})

router.get('/specials', (req,res) => {
    specials(req, res)
})

router.get('/sellers', (req,res) => {
    topSellers(req, res)
})

router.get('/releases', (req,res) => {
    newReleases(req, res)
})

router.get("/mensaje", (req, res) => {
    res.send("hola mundo")
})

router.post('/upload', upload.single('file') ,(req, res) => {
    uploadPhoto(req, res)
})

//
//
//router.get("/recipes/:idRecipe", (req, res) => {
//    getRecipesId(req, res)
//})
//
//
//router.get("/recipesName", (req, res) => {
//    getRecipesName(req, res);
//})
//
//
//router.post("/recipes", (req, res) => {
//    postRecipes(req, res);
//})
//
//
//router.get("/diets", (req, res) => {
//    getDiets(req, res);
//})

// Rutas de Registro de Usuarios
router.post("/crearCuenta", createAccount)
router.post("/iniciarSesion", logIn)
router.post("/cerrarSesion", cerrarSesion)

// Ruta del perfil del Usuario (esto es solo un ejemplo, se encarga Cristian)
// esto sera como una ruta protegida
router.get("/profile", validateToken, profileUser);



// Ruta para tarer todos los Games (borrado lógico)
router.get('/games', getAllGames);
// Ruta para tarer un Game (borrado lógico)
router.get('/games/:id', getGame);
// Ruta para crear un Game (borrado lógico)
router.post('/games', createGames);
// Ruta para eliminar un Games por id (borrado lógico)
router.delete('/games/:id', deleteGame);
// Ruta para actualizar datos un Game (borrado lógico)
router.put('/games/:id', updateGame);
// Ruta para banear un Game (borrado lógico)
router.put('/games/:gamesId/ban', banGame);



// Ruta para tarer todos los usuario (borrado lógico)
router.get('/users', getAllUsers);
// Ruta para tarer un usuario (borrado lógico)
router.get('/users/:id', getUser);
// Ruta para crear un usuario (borrado lógico)
router.post('/users', createUser);
// Ruta para eliminar un usuario por id (borrado lógico)
router.delete('/users/:id', deleteUser);
// Ruta para actualizar datos un usuario (borrado lógico)
router.put('/users/:id', upload.single('file'), updateUser);
// Ruta para banear un usuario (borrado lógico)
router.put('/users/:userId/ban', banUser);
//




module.exports = router;
