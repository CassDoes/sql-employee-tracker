const connection = require("./connection")

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query(`SELECT name AS Departments FROM department;`)
  }

  findAllRoles() {
    return this.connection.query(`SELECT role.id AS ID, role.title AS Position, role.salary AS Salary, department.name AS Department
    FROM role
    INNER JOIN department ON role.department_id = department.id;`);
  }
}

module.exports = new DB(connection);