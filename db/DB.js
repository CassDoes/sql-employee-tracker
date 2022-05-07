const connection = require("./connection")

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return 'hi';
  }
}

module.exports = new DB(connection);