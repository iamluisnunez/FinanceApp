const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("express/lib/response");
require("dotenv").config();

const getAdmin = (req, res) => {
  pool.query("Select admin_name from admin", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getSingleAdmin = (req, res) => {
  //   const str = `Select admin_name from admin where admin_id = ${req.params.id}`
  //   res.send(req.params.id);
  pool.query(
    "Select * from admin where admin_id = $1",
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

const newAdmin = async (req, res) => {
  const { admin_name, admin_password, first_name, last_name } = req.body;
  if (!admin_name || !admin_password || !first_name || !last_name) {
    return res.status(400).send("You missed a required field");
  }
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.exec(admin_name)) {
    return res.status(400).send("Email is not in proper form");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admin_password, salt);
  console.log(hashedPassword);
  const insert = `insert into admin (admin_name, admin_password, first_name, last_name) values('${admin_name}', '${hashedPassword}', '${first_name}', '${last_name}')`;
  pool.query(insert, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    } else {
      return res.status(200).send("Insert into table");
    }
  });
};

const login = async (req, res) => {
  const findPassword = `Select admin_password from admin where admin_name = '${req.body.admin_name}'`;
  let password = "";
  pool.query(findPassword, async (error, results) => {
    if (error) {
      return res.status(400).json(error);
    } else if (!results.rows.length) {
      return res.status(400).send("User Not Found");
    } else {
      password = results.rows[0];
      console.log(password);
    }
    const match = await bcrypt.compare(
      req.body.admin_password,
      password.admin_password
    );
    if (match) {
      const accessToken = jwt.sign(
        {
          admin_name: req.body.admin_name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      return res.status(200).json(accessToken);
    }
    return res.status(400).send(match);
  });
};

module.exports = {
  getAdmin,
  getSingleAdmin,
  newAdmin,
  login,
};
