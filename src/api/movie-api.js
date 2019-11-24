import fetch from "node-fetch";
import config from "../config";

export default class MovieApi {

    static async getAll() {
        const movies = await fetch(config.movieApi)
            .then(res => res.json());

        return movies;
    }
}