import MovieApi from "../api/movie-api";
import ArrayHelper from "../helper/array-helper";

export default class MovieService {

    static async getAll() {
        return await MovieApi.getAll();
    }

    static async getChampions(selectedMovies) {
        selectedMovies = await this.getAll();
        const arrayHelper = new ArrayHelper(selectedMovies);

        const orderedMovies = arrayHelper.sortByStringProperty("titulo");

        return orderedMovies;
    }
}