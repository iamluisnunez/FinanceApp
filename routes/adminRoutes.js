const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/admin", userController.getUser);
router.get("/admin/:id", userController.getSingleUser);
router.post("/admin", userController.newUser);
router.post("/login", userController.login);

module.exports = router;