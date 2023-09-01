const Pool = require("pg").Pool;

const pool = new Pool({
  user: "luisnunez",
  host: "localhost",
  database: "FinanceManager",
  password: "",
  port: 5432,
});

module.exports = pool;
