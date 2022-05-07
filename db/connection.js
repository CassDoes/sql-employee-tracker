const mysql = require('mysql2')
const util = require('util')

require('dotenv').config()

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASS,
    database: process.env.DATABASE
  }
);

db.connect()

db.query = util.promisify(db.query)

module.exports = db;