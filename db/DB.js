const connection = require("./connection")

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.query(`
    SELECT id AS ID,
    name AS Department
    FROM department;`)
  }

  findAllRoles() {
    return this.connection.query(`
    SELECT department.name AS Department, 
    role.id AS ID, 
    role.title AS Position, 
    role.salary AS Salary
    FROM role
    INNER JOIN department ON role.department_id = department.id;`);
  }

  findAllManagers() {
    return this.connection.query(`
    SELECT CONCAT (first_name,' ',last_name) AS Manager,
    id AS EmployeeID
    FROM employee
    WHERE manager_id IS NULL;`)
  }

  findAllEmployees() {
    return this.connection.query(`
    SELECT employee.id AS EmployeeID, 
    CONCAT (employee.first_name,' ',employee.last_name) AS Employee,
    role.title AS Position,
    department.name AS Department,
    role.salary AS Salary,
    CONCAT (manager.first_name,' ',manager.last_name) AS Manager
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

  addNewRole(role) {
    return this.connection.query(`INSERT INTO role SET ?`, role)
  }

  updateEmployeeRole(roleID, employeeID) {
    return this.connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleID, employeeID])
  }
}

module.exports = new DB(connection);