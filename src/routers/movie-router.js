import MovieService from "../services/movie-service";
import express from "express";

const router = express.Router();

router.get("/all", async function (req, res, next) {
    const movies = await MovieService.getAll();
    res.json(movies);
});

router.post("/champions", async function (req, res, next) {   
    const service = new MovieService(req.body.selectedMovies);    
    const movies = await service.getChampions();
    
    res.json(movies);
});

module.exports = router;