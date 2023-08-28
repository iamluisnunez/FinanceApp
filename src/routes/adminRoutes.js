const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin", adminController.getUser);
router.get("/admin/:id", adminController.getSingleUser);
router.post("/admin", adminController.newUser);

module.exports = router;
