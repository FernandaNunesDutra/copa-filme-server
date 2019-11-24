import MovieService from "../service/movie-service";

export default class MovieController {

    static async getAll() {
        return await MovieService.getAll();
    }

    static async getChampions() {
        return await MovieService.getChampions()
    }
}