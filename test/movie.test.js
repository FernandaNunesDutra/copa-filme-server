require("babel-register")();

import "babel-polyfill";

import MovieService from "../src/services/movie-service";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/api";
import {
    SELECTED_MOVIES_SAME_RATING,
    SELECTED_MOVIES,
    AVENGERS_CODE,
    INCREDIBLES_CODE,
    DEADPOOL_CODE,
    ORDERED_MOVIES,
    TREE_DIAGRAM_MOVIES,
} from "../dummy";

const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe("Get all movies", () => {
    it("should get 16 movies", (done) => {
        chai.request(app)
            .get("/movie/all")
            .end((error, response) => {

                expect(response.statusCode).to.equal(200);

                const body = (response.body) ? JSON.parse(JSON.stringify(response.body)) : {};

                expect(body.should.have.property("movies"));

                expect(body.movies).to.have.lengthOf(16);

                const movie = body.movies[0];

                expect(movie).to.have.all.keys("code", "title", "year", "rating");

                done();
            });
    });
});

describe("Get champion and vice movies among 8 choosen", () => {
    it("should return 1° Avengers/2º Incredibles (different ratings)", (done) => {
        chai.request(app)
            .post("/movie/champions")
            .send(SELECTED_MOVIES)
            .end((error, response) => {

                expect(response.statusCode).to.equal(200);

                const body = (response.body) ? JSON.parse(JSON.stringify(response.body)) : {};

                expect(body).to.have.all.keys("first", "second");

                const first = body.first;
                const second = body.second;

                expect(first.code).to.equal(AVENGERS_CODE);
                expect(second.code).to.equal(INCREDIBLES_CODE);

                done();
            });
    });

    it("should return 1° Deadpool/2º Incredibles (same rating)", (done) => {
        chai.request(app)
            .post("/movie/champions")
            .send(SELECTED_MOVIES_SAME_RATING)
            .end((error, response) => {

                expect(response.statusCode).to.equal(200);

                const body = (response.body) ? JSON.parse(JSON.stringify(response.body)) : {};

                expect(body).to.have.all.keys("first", "second");

                const first = body.first;
                const second = body.second;

                expect(first.code).to.equal(DEADPOOL_CODE);
                expect(second.code).to.equal(INCREDIBLES_CODE);

                done();
            });
    });
});

describe("Return movies sorted alphabetically", () => {
    it("should return movies sorted", function () {
        const service = new MovieService(SELECTED_MOVIES.selectedMovies);
        const moviesSorted = service.sortMoviesByTitle();

        const sameMovieOrder = ORDERED_MOVIES.reduce(function (sameOrder, movie, index) {
            return sameOrder && (movie.code == moviesSorted[index]).code;
        }, true);

        expect(sameMovieOrder);
    });
});

describe("Return tree diagram movie", () => {
    it("should return diagram movie rightly", function () {
        const service = new MovieService(SELECTED_MOVIES.selectedMovies);
        const treeDiagram = service.buildMovieTreeDiagram();

        const sameTreeDiagram = TREE_DIAGRAM_MOVIES.reduce(function (sameOrder, movie, index) {
            return sameOrder && (movie.code == treeDiagram[index]).code;
        }, true);

        expect(sameTreeDiagram);
    });
});