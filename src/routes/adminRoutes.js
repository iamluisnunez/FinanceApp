const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {
  res.send("we are in admin");
});

module.exports = router;
