import MovieApi from "../api/movie-api";
import ArrayHelper from "../helpers/array-helper";
import { TITLE_PROPERTY, RATING_PROPERTY } from "../constants";

export default class MovieService {

    constructor(movies){
        this.movies = movies;
    }

    static async getAll() {
        return await MovieApi.getAll();
    }

    getChampions() {

        return this.compareMovies();
    }

    sortMoviesByTitle() {
        const arrayHelper = new ArrayHelper(this.movies);
        return arrayHelper.sortByStringProperty(TITLE_PROPERTY);
    }

    buildMovieTreeDiagram() {

        const orderedMovies = this.sortMoviesByTitle();

        const length = orderedMovies.length;
        const halfMovies = orderedMovies.slice(0, length / 2);

        return halfMovies.reduce((arr, movie, index) => {
            arr.push(...[movie, orderedMovies[length - (index + 1)]]);
            return arr;
        }, []);
    }

    compareMovies() {

        const movieTreeDiagram = this.buildMovieTreeDiagram();

        return this.compareRatingMovie(movieTreeDiagram, 0);
    }

    compareRatingMovie(movies, index) {

        if (this.isEndOfCompetition(movies)) {
            return this.getClassification(movies[0], movies[1]);           
        }

        const arrayHelper = new ArrayHelper(movies);
        movies = arrayHelper.removeLessValuePropertyBetween(index, index + 1, RATING_PROPERTY);

        return this.compareRatingMovie(movies, this.getNextMovieIndex(index, movies.length))
    }

    getClassification(firstMovie, secondMovie){
        const isFirstHighest = firstMovie.nota > secondMovie.nota;
        
        return {
            first: isFirstHighest ? firstMovie : secondMovie,
            second: isFirstHighest ? secondMovie : firstMovie,
        }
    }

    getNextMovieIndex(index, movieLength) {
        const NEXT_GROUP = index + 1;
        const NEXT_FASE = 0;

        return index + 1 == movieLength ? NEXT_FASE : NEXT_GROUP;
    }

    isEndOfCompetition(movies) {
        return movies.length == 2;
    }

}