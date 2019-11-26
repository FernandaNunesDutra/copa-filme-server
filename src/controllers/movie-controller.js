import Movie from "../models/movie-model";
import MovieService from "../services/movie-service";

export default class MovieController {
  constructor(selectedMovies) {
    this.service = new MovieService(selectedMovies);
  }

  static async getAll() {
    const movies = await MovieService.getAll();
    return movies.map((m) => Movie.parseFromJson(m));
  }

  getChampions() {
    return this.service.getChampions();
  }
}
