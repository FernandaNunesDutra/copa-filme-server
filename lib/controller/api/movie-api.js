"use strict";

const fetch = require('node-fetch');

module.exports = class MovieApi {
  static async getAll() {
    const URL_TO_FETCH = "http://copafilmes.azurewebsites.net/api/filmes";
    const movies = await fetch(URL_TO_FETCH).then(res => res.json());
    return movies;
  }

};