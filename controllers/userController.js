const pool = require("../db");
const bcrypt = require("bcrypt");
const { user, password } = require("pg/lib/defaults");

const getUser = (req, res) => {
  pool.query("select * from users", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getSingleUser = (req, res) => {
  pool.query(
    "Select username from users where user_id = $1",
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

const newUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  if (!username || !email || !password) {
    return res.status(400).send("You missed a required field");
  }
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!re.exec(email)) {
    return res.status(400).send("Email is not in proper form");
  }
  const insert = `INSERT INTO users (username, password, email) values('${username}', '${hashedPassword}', '${email}')`;
  pool.query(insert, (error, results) => {
    if (error) {
      return res.status(400).json(error["detail"]);
    } else {
      return res.status(200).send("Insert into table");
    }
  });
};

const login = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).send("Missing username or email");
  }
  const select = `SELECT FROM users WHERE username = ${username} `;
  let adminPassword = "";
  pool.query(select, async (error, results) => {
    if (error) {
      return res.status(400).json(error["detail"]);
    } else {
      adminPassword = results.rows[0].password;
    }

    const match = await bcrypt.compare(password, adminPassword);
    return res.status(200).send(match);
  });
};

module.exports = {
  getUser,
  getSingleUser,
  newUser,
  login,
};
