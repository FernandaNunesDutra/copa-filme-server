import MovieApi from "../api/movie-api";

export default class MovieService {

    static async getAll() {
        return await MovieApi.getAll();
    }

    static getChampions() {

    }
}