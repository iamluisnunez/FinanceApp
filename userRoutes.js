const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getSinglePlayer);
router.get("/users/income/:user_id", userController.getIncome);
router.get("/users/expenses/:user_id", userController.getExpenses);
router.get("/users/userid/:user_id", userController.getUserId);

router.post("/users", userController.createPlayer);
router.post("/login", userController.login);
router.post("/income", userController.createIncome);
router.post("/expenses", userController.createExpense);

router.delete("/users/:id", userController.deleteUsers);
router.delete("/income", userController.deleteExpense);
router.delete("/expense", userController.deleteExpense);
module.exports = router;
