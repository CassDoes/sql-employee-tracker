const connection = require("./connection")

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query(`SELECT * FROM department;`)
  }

  findAllRoles() {
    return this.connection.query(`SELECT department.name AS Department, role.id, role.title, role.salary
    FROM role
    INNER JOIN department ON role.department_id = department.id;`);
  }

  findAllManagers() {
    return this.connection.query(`SELECT CONCAT (first_name,' ',last_name) AS managerName,
    id AS employeeID
    FROM employee
    WHERE manager_id IS NULL;`)
  }

  findAllEmployees() {
    return this.connection.query(`SELECT employee.id AS ID, 
    CONCAT (employee.last_name,', ',employee.first_name) AS Employee,
    role.title AS Position,
    department.name AS Department,
    role.salary AS Salary,
    CONCAT (manager.last_name,', ',manager.first_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`)
  }

  addNewEmployee(employee) {
    return this.connection.query(`INSERT INTO employee SET ?`, employee)
  }

  addNewDepartment(department) {
    return this.connection.query(`INSERT INTO department SET ?`, department)
  }
}

module.exports = new DB(connection);