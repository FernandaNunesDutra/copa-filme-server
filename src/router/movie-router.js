const express = require("express");
const router = express.Router();
import MovieController from "../controller/movie-controller";

router.get("/all", async function (req, res, next) {
    const movies = await MovieController.getAll();
    res.json(movies);
});

router.post("/champions", async function (req, res, next) {
    const selectedMovies = req.selectedMovies;
    const movies = await MovieController.getChampions();
    res.json(movies);
});

module.exports = router;