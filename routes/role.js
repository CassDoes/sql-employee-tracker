const inquirer = require('inquirer');

//UPDATE EMPLOYEE ROLE prompt
const promptRole = (updateRole) => {
  // If there's no 'employee' array property, create one
  if (!updateRole.employeeRole) {
    updateRole.employeeRole = [];
  }

  return inquirer.prompt ([
    {
      type: 'input',
      name: 'employee_name',
      message: "Which employee's role do you want to update?",      
    },
    {
      type: 'input',
      name: 'employee_role',
      message: "What is the name of the employee's new role?",
    },
  ])

  //add updated employee to employee role array
  .then(employeeRole => {
    updateRole.employeeRole.push(employeeRole);
    return updateRole;
  });
};