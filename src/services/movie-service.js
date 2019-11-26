import MovieApi from "../api/movie-api";
import ArrayHelper from "../helpers/array-helper";
import StringHelper from "../helpers/string-helper";

import {TITLE_PROPERTY, RATING_PROPERTY} from "../constants";

export default class MovieService {
  constructor(movies) {
    this.movies = movies;
    this.moviesClassification = this.buildMovieTreeDiagram();
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

    return this.compareRatingMovie();
  }

  compareRatingMovie(index = 0) {
    if (this.isEndOfCompetition()) {
      return this.getClassification(this.moviesClassification[0],
          this.moviesClassification[1]);
    }

    this.removeLoserMovie(index);

    return this.compareRatingMovie(this.getNextMovieIndex(index));
  }

  removeLoserMovie(index) {

    const arrayHelper = new ArrayHelper(this.moviesClassification);

    if (this.isSameRating(this.moviesClassification[index],
        this.moviesClassification[index + 1])) {
      const stringCompare = StringHelper.compare(this.moviesClassification[index].title,
          this.moviesClassification[index + 1].title);

      const indexRemove = (stringCompare > 0) ? index : index + 1;

      arrayHelper.remove(indexRemove);
    } else {
      arrayHelper.removeLessValuePropertyBetween(index, index + 1, RATING_PROPERTY);
    }

    this.moviesClassification = arrayHelper.arr;

  }

  isSameRating(firstMovie, secondMovie) {
    return firstMovie.rating == secondMovie.rating;
  }

  getClassification(firstMovie, secondMovie) {
    const isFirstHighest = firstMovie.rating > secondMovie.rating;

    return {
      first: isFirstHighest ? firstMovie : secondMovie,
      second: isFirstHighest ? secondMovie : firstMovie,
    };
  }

  getNextMovieIndex(index) {
    const NEXT_GROUP = index + 1;
    const NEXT_FASE = 0;

    return index + 1 == this.moviesClassification.length ? NEXT_FASE : NEXT_GROUP;
  }

  isEndOfCompetition() {
    return this.moviesClassification.length == 2;
  }
}
