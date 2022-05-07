const mysql = require('mysql2');
const inquirer = require('inquirer');

// const { displayDepartments, addDepartment } = require('./routes/department');
// const { addEmployee, displayEmployees } = require('./routes/employee');
// const { addRole, displayRoles, updateRole } = require('./routes/role');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'My-pass6',
    database: 'company'
  }
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

//VIEW all DEPARTMENTS*
async function displayDepartments() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'company'});
  const [rows, fields] = await connection.execute(`
    SELECT name AS Departments 
    FROM department
  `);
  console.table(rows);
  startPrompt();
};


//VIEW all ROLES*
async function displayRoles() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'company'});
  const [rows, fields] = await connection.execute(`
    SELECT role.id AS ID, role.title AS Position, role.salary AS Salary, department.name AS Department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `);
  console.table(rows);
  startPrompt();
};

//VIEW all EMPLOYEES*
async function displayEmployees() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'company'});
  const [rows, fields] = await connection.execute(`
    SELECT employee.id AS ID, 
    CONCAT (employee.last_name,', ',employee.first_name) AS Employee,
    role.title AS Position,
    department.name AS Department,
    role.salary AS Salary
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY employee.last_name
  `);
  console.table(rows);
  startPrompt();
};

//ADD a DEPARTMENT*
const addDepartment = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the department you would like to add?",      
    },
  ])
  .then(departmentData => {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = departmentData.name;
    
    db.promise().query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    console.log('====================\nAdded ' + departmentData.name + ' to the COMPANY database.\n====================');
  })
  .then (
    displayDepartments,
    startPrompt
    )
};

//ADD an EMPLOYEE
const addEmployee = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'first_name',
      message: "Please enter the first name of the employee.",
      validate: firstName => {
        if (firstName) {
          return true;
        } else {
          return false;
        }
      }      
    },
    {
      type: 'input',
      name: 'last_name',
      message: "Please enter the last name of the employee.",
      validate: lastName => {
        if (lastName) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'role',
      message: "What is the employee's role?",
    },
    {
      type: 'input',
      name: 'manager_name',
      message: "Who is the employee's manager?",
    },
  ])

  .then(employeeData => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const param = employeeData.first_name;
    const params = employeeData.last_name;
    
    db.promise().query(sql, param, params, (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    console.log('Added ' + employeeData.first_name + ' to the COMPANY database');
  })
  .then(startPrompt);
};

// class DB{
//   constructor(connection){
//     this.connection =connection
//   }
//   findAllDepartments(){
//     return this.connection.promise().query(
//       "SELECT department.id, department.name FROM department"
//     )
//   }
// }

// function viewEmployeesByDeparment () {
//   findAllDepartments()
//   .then(([rows]) => {
//     let department = rows
//     const departmentChoices = department.map(({id, name}) => ({
//       name:name,
//       value:id
//     }))
//   prompt([
//     {
//       type: "list",
//       name: "departmentId",
//       message: "Which department would you like to choose?",
//       choices: [departmentChoices]
//     }
//   ])
//     .then(res => db.findAllEmployeesByDepartment(res.departmentId))
//     .then(([rows])=> {
//       let employees = rows;
//       console.log("\n");
//       console.table(employees)
//     })
//     .then(() => startPrompt())
//   });
// }

//UPDATE an EMPLOYEE
const updateRole = () => {
  return inquirer.prompt ([
    {
      type: 'list',
      name: 'employee_name',
      message: "Which employee's role do you want to update?",
      choices: []   
    },
    {
      type: 'input',
      name: 'employee_role',
      message: "What is the name of the employee's new role?",
    },
  ])
  .then(employeeRole => {
    const sql = `INSERT INTO role (employee_role)
    VALUES (?)`;
    const params = employeeRole.name

    db.promise().query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    console.log('Added ' + employeeRole.name + ' to the COMPANY database');
  })
  .then(startPrompt);
};


startPrompt();

module.exports = startPrompt;
