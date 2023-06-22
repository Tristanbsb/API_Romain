/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const actorRoutes = require("./routes/actor.routes");
const genreRoutes = require("./routes/genre.routes");
const filmRoutes = require("./routes/film.routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT;

app.use("/api/actor", actorRoutes);
app.use("/api/genre", genreRoutes);
app.use("/api/film", filmRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

