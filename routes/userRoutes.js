const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getSinglePlayer);
router.post("/users", userController.createPlayer);

module.exports = router;
