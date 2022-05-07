// const mysql = require('mysql2');
// const inquirer = require('inquirer');

//displays all employees
// async function displayEmployees() {
//   const mysql = require('mysql2/promise');
//   const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'staff'});
//   const [rows, fields] = await connection.execute(`SELECT * FROM employee`);
//   console.table(rows);
// };

//ADD EMPLOYEE prompt
const addEmployee = (employeeData) => {
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
      type: 'list',
      name: 'manager_name',
      message: "Who is the employee's manager?",
    },
  ])

  //add employee to staff array
  .then(employeeInfo => {
    // employeeData.staff.push(employeeInfo);
    return employeeData;
  });
};



module.exports = { addEmployee, displayEmployees };