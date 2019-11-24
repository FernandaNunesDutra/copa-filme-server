import Movie from "../models/movie-model";
import MovieService from "../services/movie-service";

export default class MovieController {

    constructor(selectedMovies){
        this.movies = selectedMovies.map(m =>  Movie.parseFromJson(m));
        this.service = new MovieService(this.movies);
    }

    static async getAll(){
        return this.service.getAll();
    }

    getChampions(){
        return this.service.getChampions();
    }
}