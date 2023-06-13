const { Router } = require('express');
const  saveGames = require("../controllers/saveGames")
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


module.exports = router;
