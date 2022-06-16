const mySql = require("mysql");
require("dotenv").config();
var connction = mySql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connction.connect((err) => {
  if (!err) {
    console.log("connected to database .");
  } else {
    console.log(err);
  }
});

module.exports = connction;
