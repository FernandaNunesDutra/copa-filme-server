"use strict";

const MovieService = require("../service/movie-service");

module.exports = class MovieController {
  static async getAll() {
    return await MovieService.getAll();
  }

  static getChampions() {}

};