const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin", adminController.getAdmin);

module.exports = router;
