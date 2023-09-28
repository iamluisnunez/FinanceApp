const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getSinglePlayer);
router.get("/users/income/:user_id", userController.getIncome);
router.get("/users/expenses/:user_id", userController.getExpenses);

router.post("/users", userController.createPlayer);
router.post("/login", userController.login);
router.post("/income", userController.createIncome);
router.post("/expenses", userController.createExpense);

router.delete("/users/:id", userController.deleteUsers);
module.exports = router;
