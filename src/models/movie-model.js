export default class Movie {
  constructor(code, title, year, rating) {
    this.code = code;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }

  static parseFromJson(movie) {
    return new Movie(movie.id, movie.titulo, movie.ano, movie.nota);
  }
}
