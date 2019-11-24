import MovieController from "../controller/movie-controller";
import express from "express";

const router = express.Router();

router.get("/all", async function (req, res, next) {
    const movies = await MovieController.getAll();
    res.json(movies);
});

router.get("/champions", async function (req, res, next) {
    //const selectedMovies = req.selectedMovies;
    const movies = await MovieController.getChampions();
    res.json(movies);
});

module.exports = router;