const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin", adminController.getAdmin);
router.get("/admin/:id", adminController.getSingleAdmin);
router.post("/admin", adminController.newUser);

module.exports = router;
