import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import movieRouter from "./routers/movie-router";

const api = express();
const router = express.Router();

api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

router.get("/", (req, resp) => resp.json({
    mensagem : "API ONLINE"
}));

api.use("/", router);
api.use("/movie", movieRouter);

api.listen(config.port);

console.log("Run...");

module.exports = api;
