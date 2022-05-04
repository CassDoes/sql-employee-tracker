const mysql = require('mysql2');
const inquirer = require('inquirer');

const { displayDepartments, addDepartment } = require('./routes/department');
const { addEmployee, displayEmployees } = require('./routes/employee');
const { addRole, displayRoles } = require('./routes/role');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'My-pass6',
    database: 'staff'
  },
  console.log('Connected to the staff database.')
);


const startPrompt = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'Please select an option from the following menu.',
      choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role'
      ]
    }
  ])
  
  .then(menuOptions => {
    if (menuOptions.menu === 'View all departments') {
      displayDepartments();
    } 
    else if (menuOptions.menu === 'View all roles') {
      displayRoles();
    }
    else if (menuOptions.menu === 'View all employees') {
      displayEmployees();
    }
    else if (menuOptions.menu === 'Add a department') {
      addDepartment();
    }
    else if (menuOptions.menu === 'Add a role') {
      addRole();
    }
    else if (menuOptions.menu === 'Add an employee') {
      addEmployee();
    }
    else if (menuOptions.menu === 'Update an employee role') {
      updateRole();
    } else {
      console.log("If you would like to exit application simply press 'ctrl + c' at any time.")
    }
  })
};



startPrompt();

// //return all employees
// db.query(`SELECT * FROM employee`, (err, rows) => {
//   //console.log(rows);
// });

// //return a single employee
// db.query(`SELECT * FROM employee WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });


// //delete an employee
// db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


// //create an employee
// const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
//               VALUES (?,?,?,?)`;
// const params = ['Lucylu', 'Hardin', 12, 11];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

module.exports = startPrompt;
