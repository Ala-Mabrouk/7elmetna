const mySql = require("mysql");
require("dotenv").config();
var connction = mySql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: "root",
  password: "",
  database: "HelmetnaDB",
});
connction.connect((err) => {
  if (!err) {
    console.log("connected to database .");
  } else {
    console.log("no ya bro");
    console.log(err);
  }
});

module.exports = connction;
