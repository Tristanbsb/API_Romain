import express from "express";
const router = express.Router();
const genreController = require("../controllers/genre.controller");
const { checkApiKey, checkAdmin } = require("../middleware/auth.middleware");

router.get("/", checkApiKey, genreController.getAllGenres);
router.post("/", checkApiKey, genreController.createGenre);
router.delete("/:id", checkApiKey, genreController.deleteGenre);
module.exports = router;
