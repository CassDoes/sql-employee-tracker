const mysql = require('mysql2');
const inquirer = require('inquirer');
const { displayRoles, updateRole } = require('./routes/role');
const { addDepartment } = require('./routes/department');
const { allowedNodeEnvironmentFlags } = require('process');

// const { displayDepartments, addDepartment } = require('./routes/department');
// const { addEmployee, displayEmployees } = require('./routes/employee');
// const { addRole, displayRoles, updateRole } = require('./routes/role');
// const { start } = require('repl');

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


const startPrompt = async () => {
  try {
    let userSelection = await inquirer.prompt({
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
  });

  switch (userSelection.menu) {
    case 'View all departments':
      displayDepartments();
      break;

    case 'View all roles':
      displayRoles();
      break;

    case 'View all employees':
      displayEmployees();
      break;

    case 'Add a department':
      addDepartment();
      break;

    case 'Add a role':
      addRole();
      break;
      
    case 'Add an employee':
      addEmployee();
      break;

    case 'Update an employee role':
      updateRole();
      break;
    
    case 'I am done':
      db.end();
  }
} catch (err) {
    console.log(err);
    startPrompt();
  } 
};

async function displayDepartments() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'staff'});
  const [rows, fields] = await connection.execute(`SELECT * FROM department`);
  console.table(rows);
  startPrompt();
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
