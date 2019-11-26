require("babel-register")();

import "babel-polyfill";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/api";
import {
    SELECTED_MOVIES_SAME_RATING,
    SELECTED_MOVIES,
    AVENGERS_CODE,
    INCREDIBLES_CODE,
    DEADPOOL_CODE,
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

describe("Get champion and vice movie movies among 8 choosen", () => {
    it("should return 1° Avengers/2º Incredibles", (done) => {
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
});

describe("Get champion and vice movie movies among 8 movies choosen (with same rating)", () => {
    it("should return 1° Deadpool/2º Incredibles", (done) => {
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