const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRouter = require("./src/router/movie-router");

const api = express();
const port = 3000;
const router = express.Router();


api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

router.get("/", (req, resp) => resp.json({
    mensagem : "API ONLINE"
}));

api.use("/", router);
api.use("/movie", movieRouter);

api.listen(port);

console.log("Run...")