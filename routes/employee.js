const inquirer = require('inquirer');

//ADD EMPLOYEE prompt
const addEmployee = (employeeData) => {
  // If there's no 'employee' array property, create one
  // if (!employeeData.staff) {
  //   employeeData.staff = [];
  // }
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
      validate: employeeRole => {
        if (employeeRole) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'manager_name',
      message: "Who is the employee's manager?",
      validate: managerName => {
        if (managerName) {
          return true;
        } else {
          return false;
        }
      }
    },
  ])

  //add employee to staff array
  .then(employeeInfo => {
    // employeeData.staff.push(employeeInfo);
    return employeeData;
  });
};

module.exports = addEmployee;