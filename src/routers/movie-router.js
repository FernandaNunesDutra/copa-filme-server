import MovieController from "../controllers/movie-controller";
import express from "express";

const router = express.Router();

router.get("/all", async function (req, res, next) {
    const movies = await MovieController.getAll();
    res.json(movies);
});

router.post("/champions", async function (req, res, next) {   
        
    const service = new MovieController(req.body.selectedMovies);    
    
    const movies = await service.getChampions();
    
    res.json(movies);
});

module.exports = router;