const inquirer = require('inquirer');
const db = require('./db/DB');
require('console.table');

//Initial MENU starts here
const startPrompt = async () => {
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
        'Update an employee role',
        'Exit from program'
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
    
    default:
      quit();
  }
};

//VIEW all DEPARTMENTS
async function displayDepartments() {
  const allDepartments = await db.findAllDepartments()
  console.table(allDepartments);
  startPrompt();
};

//VIEW all ROLES
async function displayRoles() {
  const allRoles = await db.findAllRoles()
  console.table(allRoles);
  startPrompt();
};

//VIEW all MANAGERS
async function displayManagers() {
  const allManagers = await db.findAllManagers()
  console.table(allManagers);
  startPrompt();
}

//VIEW all EMPLOYEES
async function displayEmployees() {
  const allEmployees = await db.findAllEmployees()
  console.table(allEmployees);
  startPrompt();
}

//ADD a DEPARTMENT
const addDepartment = async () => {

  const createDepartment = await inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the department you would like to add?",      
    },
  ])

  await db.addNewDepartment(createDepartment);

  console.log('Added ' + createDepartment.name + ' department to COMPANY database');

  startPrompt();
};

//ADD a ROLE
const addRole = async () => {
  const getDepartments = await db.findAllDepartments();

  const departmentChoices = getDepartments.map(({ Department, ID }) => ({ name: Department, value: ID })) 

  const createNewRole = await inquirer.prompt ([
    {
      type: 'input',
      name: 'title',
      message: "What is the name of the position you would like to add?",      
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of the position you would like to add?", 
    },
    {
      type: 'list',
      name: 'department_id',
      message: "What is the department of the position you would like to add?",
      choices: departmentChoices
    },
  ])

  await db.addNewRole(createNewRole)
  console.log('Added ' + createNewRole.title + ' position to COMPANY database')
  startPrompt();
};

//ADD an EMPLOYEE
async function addEmployee() {
  const roles = await db.findAllRoles();
  const reportTo = await db.findAllManagers();

  const position = roles.map(({ Position, ID }) => ({ name: Position, value: ID })) 
  const employeeManager = reportTo.map(({ Manager, EmployeeID }) => ({ name: Manager, value: EmployeeID }))

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
  console.log('Added the employee ' + newEmployee.first_name + ' ' + newEmployee.last_name + ' to COMPANY database.')
  startPrompt();
};

//UPDATE an EMPLOYEE
const updateRole = async () => {
  const getEmployees = await db.findAllEmployees();
  const getRoles = await db.findAllRoles();

  const employeeChoices = getEmployees.map(({ Employee, EmployeeID }) => ({ name: Employee, value: EmployeeID })) 
  const roleChoices = getRoles.map(({ Position, ID }) => ({ name: Position, value: ID })) 

  const { employee, employee_role } = await inquirer.prompt ([
    {
      type: 'list',
      name: 'employee',
      message: "Which employee's role do you want to update?",
      choices: employeeChoices   
    },
    {
      type: 'list',
      name: 'employee_role',
      message: "What is the name of the employee's new role?",
      choices: roleChoices
    },
  ])

  await db.updateEmployeeRole(employee_role, employee)
  console.log("Employee's role has been updated");
  startPrompt();
};

//QUIT PROGRAM
const quit = () => {
  console.log('Goodbye!')
  process.exit()
}

startPrompt();
