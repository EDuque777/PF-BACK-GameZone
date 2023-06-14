const { Router } = require('express');
const  saveGames = require("../controllers/saveGames")
const {allGames} = require("../controllers/allGames")


const router = Router();

router.get("/back/", (req, res) => {
    saveGames(req, res);
})

router.get("/allGames", (req, res) => {
    allGames(req,res);
})


module.exports = router;
