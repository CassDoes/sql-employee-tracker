const inquirer = require('inquirer');
const db = require('./db/DB');
require('console.table');

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
        'View all managers', 
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

    case 'View all managers':
      displayManagers();
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
  const allDepartments = await db.findAllDepartments()
  console.table(allDepartments);
  startPrompt();
};

//VIEW all ROLES*
async function displayRoles() {
  const allRoles = await db.findAllRoles()
  console.table(allRoles);
  startPrompt();
};

//VIEW all MANAGERS*
async function displayManagers() {
  const allManagers = await db.findAllManagers()
  console.table(allManagers);
  startPrompt();
}

//VIEW all EMPLOYEES*
async function displayEmployees() {
  const allEmployees = await db.findAllEmployees()
  console.table(allEmployees);
  startPrompt();
}

//ADD a DEPARTMENT*
const addDepartment = async () => {

  const createDepartment = await inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the department you would like to add?",      
    },
  ])

  await db.addNewDepartment(createDepartment);

  console.log('Added new department to database');

  startPrompt();
};

//ADD a ROLE
const addRole = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the position you would like to add?",      
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of the position you would like to add?", 
    },
    {
      type: 'input',
      name: 'department',
      message: "What is the department of the position you would like to add?",
    },
  ])
  .then(roleData => {
    const sql = `INSERT INTO role (title)
    VALUES (?)`;
    const params = roleData.name;
    
    db.promise().query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    console.log('====================\nAdded ' + roleData.name + ' to the COMPANY database.\n====================');
  })
  .then (
    displayRoles,
    startPrompt
    )
};

//ADD an EMPLOYEE*
async function addEmployee() {
  const roles = await db.findAllRoles();
  const reportTo = await db.findAllManagers();

  const position = roles.map(({ title, id }) => ({ name: title, value: id })) 
  const employeeManager = reportTo.map(({ managerName, employeeID }) => ({ name: managerName, value: employeeID }))

  const newEmployee = await inquirer.prompt ([
    {
      type: 'input',
      name: 'first_name',
      message: "Please enter the first name of the employee."     
    },
    {
      type: 'input',
      name: 'last_name',
      message: "Please enter the last name of the employee."
    },
  ])

  const { role } = await inquirer.prompt ([
    {
      type: 'list',
      name: 'role',
      message: "What is the employee's role?",
      choices: position
    },
  ])

  newEmployee.role_id = role

  const { manager } = await inquirer.prompt ([
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's manager?",
      choices: employeeManager
    },
  ])
  newEmployee.manager_id = manager
  await db.addNewEmployee(newEmployee)
  console.log(`Added new employee to company database`)
  startPrompt();
};

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
