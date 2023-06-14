const { Router } = require('express');
const  saveGames = require("../controllers/saveGames")
const {allGames} = require("../controllers/allGames")
const {nameGames} = require("../controllers/nameGames")
const {categoryGames} = require("../controllers/categoryGames")
const {genresGames} = require("../controllers/genresGames")
const {platformGames} = require("../controllers/platformGames")
const {languageGames} = require("../controllers/languageGames")
const {developersGames} = require("../controllers/developersGames")
const {editorsGames} = require("../controllers/editorsGames")
const router = Router();

router.get("/back/", (req, res) => {
    saveGames(req, res);
})

router.get("/allGames", (req, res) => {
    allGames(req,res);
})

router.get("/nameGames", (req, res) => {
    nameGames(req, res);
})

router.get("/categoryGames", (req, res) => {
    categoryGames(req, res);
})

router.get("/genresGames", (req, res) => {
    genresGames(req, res);
})

router.get("/platformGames", (req, res) => {
    platformGames(req, res);
})

router.get("/languageGames", (req, res) => {
    languageGames(req, res);
})

router.get("/developersGames", (req, res) => {
    developersGames(req, res);
})

router.get("/editorsGames", (req, res) => {
    editorsGames(req, res);
})

module.exports = router;
