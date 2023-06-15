const { Router } = require('express');
const  saveGames = require("../controllers/saveGames")
const { createAccount } = require("../controllers/createAccount.js")
const { logIn } = require("../controllers/logIn.js")
const { cerrarSesion } = require("../controllers/logout.js")
const { profileUser } = require("../controllers/profile.js")
const { validateToken } = require("../middlewares/validateToken.js")
//const {getRecipesId} = require("../controllers/getRecipesId")
//const {getRecipesName} = require("../controllers/getRecipesName");
//const {postRecipes} = require("../controllers/postRecipes")
//const {getDiets} = require("../controllers/getDiets")
//const {login} = require("../controllers/login")

const router = Router();

//router.get('/login', login);
//
//
router.get("/back/", (req, res) => {
    saveGames(req, res);
})

router.get("/mensaje", (req, res) => {
    res.send("hola mundo")
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
router.get("/profile", validateToken, profileUser)

module.exports = router;
