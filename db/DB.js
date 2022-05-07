const connection = require("./connection")

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query(`SELECT name AS Departments FROM department;`)
  }
}

module.exports = new DB(connection);