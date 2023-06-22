import express from "express";
const router = express.Router();
const actorController = require("../controllers/actor.controller");
const { checkApiKey, checkAdmin } = require("../middleware/auth.middleware");

router.get("/", checkApiKey, actorController.getAllActors);
router.get("/:id", checkApiKey, actorController.getActorById);
router.post("/", checkApiKey, actorController.createActor);
router.put("/:id", checkApiKey, actorController.updateActor);
router.delete("/:id", checkApiKey, actorController.deleteActor);
module.exports = router;
