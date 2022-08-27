const express = require("express");
require("dotenv").config();
const body_parser = require("body-parser");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const standupRoute = require("./routes/standups");
const showRoute = require("./routes/shows");
const animeRoute = require("./routes/animes");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/standups", standupRoute);
app.use("/api/shows", showRoute);
app.use("/api/animes", animeRoute);

mongoose.connect('mongodb://localhost:27017/MyMovies')
        .then(() => console.log("DB Connection Successfull"))
        .catch(err => console.log(err));

app.use(body_parser.json());
app.use(cors());

app.listen( process.env.PORT | 3000, () => {
    console.log("Backend server is running on port " + process.env.PORT);
});