import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./static" });
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./static" });
});

router.get("/movies", (req, res) => {
  res.sendFile("models/movies/movies.html", { root: "./static" });
});

router.get("/shows", (req, res) => {
  res.sendFile("models/shows/shows.html", { root: "./static" });
});

router.get("/standups", (req, res) => {
  res.sendFile("models/standups/standups.html", { root: "./static" });
});

router.get("/animes", (req, res) => {
  res.sendFile("models/animes/animes.html", { root: "./static" });
});

router.get("/users", (req, res) => {
  res.sendFile("models/users/users.html", { root: "./static" });
});

export default router;
