import express from "express";
const router = express.Router();
const filmController = require("../controllers/film.controller");
const { checkApiKey, checkAdmin } = require("../middleware/auth.middleware");

router.get("/", checkApiKey, filmController.getAllFilms);
router.get("/:id", checkApiKey, filmController.getFilmById);
router.post("/", checkApiKey, filmController.createFilm);
router.put("/:id", checkApiKey, filmController.updateFilm);
router.delete("/:id", checkApiKey, filmController.deleteFilm);
module.exports = router;
