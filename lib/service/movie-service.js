"use strict";

const MovieApi = require("../api/movie-api");

module.exports = class MovieService {
  static async getAll() {
    return await MovieApi.getAll();
  }

  static getChampions() {}

};