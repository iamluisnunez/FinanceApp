const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin", adminController.getAdmin);
router.get("/admin/:id", adminController.getSingleAdmin);
router.post("/admin", adminController.newAdmin);
router.post("/login", adminController.login);
router.delete("/users/:id", adminController.deleteUsers);

module.exports = router;
