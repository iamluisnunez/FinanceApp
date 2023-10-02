const pool = require("./db");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  pool.query("select * from users", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getSinglePlayer = (req, res) => {
  //   const str = `Select admin_name from admin where admin_id = ${req.params.id}`
  //   res.send(req.params.id);
  pool.query(
    "Select * from users where user_id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const createPlayer = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("You missed a required field");
  }
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.exec(email)) {
    return res.status(400).send("Email is not in proper form");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const insert = `insert into users(email, password) values('${email}', '${hashedPassword}')`;
  pool.query(insert, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    } else {
      return res.status(200).send("Insert into table");
    }
  });
};
const deleteUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteQuery = "DELETE FROM users WHERE user_id = $1";
    const deleteValues = [userId];

    await pool.query(deleteQuery, deleteValues);

    res.status(204).send(); // 204 No Content indicates successful deletion
  } catch (error) {
    console.error("Error deleting admin:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the admin." });
  }
};
const login = async (req, res) => {
  const findPassword = `Select password from users where email = '${req.body.email}'`;
  let _password_ = "";
  pool.query(findPassword, async (error, results) => {
    if (error) {
      return res.status(400).json(error);
    } else if (!results.rows.length) {
      return res.status(400).send("User Not Found");
    } else {
      _password_ = results.rows[0];
      console.log(_password_);
    }
    const match = await bcrypt.compare(req.body.password, _password_.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      return res.status(200).json(accessToken);
    }
    return res.status(401).send("Invalid Password");
  });
};
// userController.js

// Function to create a new income record for a user
const createIncome = async (req, res) => {
  try {
    const { user_id, description, amount, date } = req.body;

    // Store the income record in the database
    // Example SQL query:
    const insertQuery = `
      INSERT INTO income (user_id, description, amount, date)
      VALUES ($1, $2, $3, $4)
    `;

    const insertValues = [user_id, description, amount, date];

    await pool.query(insertQuery, insertValues);

    res.status(201).send("Income record created successfully.");
  } catch (error) {
    console.error("Error creating income record:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating income record." });
  }
};

// Similar function to create an expense record...

// Function to retrieve income records for a user
const getIncome = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Retrieve income records for the specified user
    // Example SQL query:
    const selectQuery = "SELECT * FROM income WHERE user_id = $1";

    const selectValues = [user_id];

    const results = await pool.query(selectQuery, selectValues);

    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error retrieving income records:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving income records." });
  }
};

const createExpense = async (req, res) => {
  const { userId, description, amount } = req.body;

  try {
    // Insert the expense record into your database
    const insertQuery = `
      INSERT INTO expense (user_id, description, amount)
      VALUES ($1, $2, $3)
      RETURNING *;`;

    const insertValues = [userId, description, amount];

    const result = await pool.query(insertQuery, insertValues);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating expense:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating expense." });
  }
};
const getExpenses = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Retrieve income records for the specified user
    // Example SQL query:
    const selectQuery = "SELECT * FROM income WHERE user_id = $1";

    const selectValues = [user_id];

    const results = await pool.query(selectQuery, selectValues);

    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error retrieving income records:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving income records." });
  }
};

module.exports = {
  getUsers,
  getSinglePlayer,
  createPlayer,
  login,
  deleteUsers,
  createIncome,
  createExpense,
  getExpenses,
  getIncome,
};
