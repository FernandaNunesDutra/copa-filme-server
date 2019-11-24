import MovieApi from "../api/movie-api";
import ArrayHelper from "../helper/array-helper";
import { TITLE_PROPERTY } from "../constants";

export default class MovieService {

    static async getAll() {
        return await MovieApi.getAll();
    }

    static async getChampions(selectedMovies) {

        selectedMovies = (await this.getAll()).slice(8);

        return this.compareMovies(selectedMovies);
    }

    static sortMoviesByTitle(movies) {
        const arrayHelper = new ArrayHelper(movies);
        return arrayHelper.sortByStringProperty(TITLE_PROPERTY);
    }

    static buildMovieTreeDiagram(movies) {

        const orderedMovies = this.sortMoviesByTitle(movies);

        const length = orderedMovies.length;
        const halfMovies = orderedMovies.slice(0, length / 2);

        return halfMovies.reduce((arr, movie, index) => {
            arr.push(...[movie, orderedMovies[length - (index + 1)]]);
            return arr;
        }, []);
    }

    static async compareMovies(movies) {

        const movieTreeDiagram = this.buildMovieTreeDiagram(movies);

        return this.compareRatingMovie(movieTreeDiagram, 0);
    }

    static compareRatingMovie(movies, index) {

        if (this.isEndOfCompetition(movies)) {
            return this.getClassification(movies[0], movies[1]);           
        }

        const arrayHelper = new ArrayHelper(movies);
        movies = arrayHelper.removeLessValuePropertyBetween(index, index + 1, "nota");

        return this.compareRatingMovie(movies, this.getNextMovieIndex(index, movies.length))
    }

    static getClassification(firstMovie, secondMovie){
        const isFirstHighest = firstMovie.nota > secondMovie.nota;
        
        return {
            first: isFirstHighest ? firstMovie : secondMovie,
            second: isFirstHighest ? secondMovie : firstMovie,
        }
    }

    static getNextMovieIndex(index, movieLength) {
        const NEXT_GROUP = index + 1;
        const NEXT_FASE = 0;

        return index + 1 == movieLength ? NEXT_FASE : NEXT_GROUP;
    }

    static isEndOfCompetition(movies) {
        return movies.length == 2;
    }

}