const pool = require("../db");
const bcrypt = require("bcrypt");
const { user, password } = require("pg/lib/defaults");
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
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json("A field is missing");
  }
  const bearer = req.headers.authorization.indexOf("Bearer");

  if (bearer === 0 && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const insert = `insert into users (username, email, password) values('${username}', '${email}', '${hashedPassword}')`;

      pool.query(insert, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json(error);
        } else {
          return res.status(200).send("Insert into table");
        }
      });
      return res.status(200).send(decoded);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  return res.status(200).json(bearer);
};

module.exports = {
  getUsers,
  getSinglePlayer,
  createPlayer,
};
