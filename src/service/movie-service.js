import MovieApi from "../api/movie-api";
import ArrayHelper from "../helper/array-helper";
import { TITLE_PROPERTY } from "../constants";

export default class MovieService {

    static async getAll() {
        return await MovieApi.getAll();
    }

    static async getChampions(selectedMovies) {
        selectedMovies = await this.getAll();
        const arrayHelper = new ArrayHelper(selectedMovies);

        const orderedMovies = arrayHelper.sortByStringProperty(TITLE_PROPERTY);

        return orderedMovies;
    }
}