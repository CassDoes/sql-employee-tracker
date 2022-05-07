const mysql = require('mysql2');
const inquirer = require('inquirer');


//DISPLAYS all ROLES
async function displayRoles() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'staff'});
  const [rows, fields] = await connection.execute(`SELECT * FROM role`);
  console.table(rows);
};

//UPDATE EMPLOYEE ROLE prompt
const updateRole = () => {
  // If there's no 'employee' array property, create one
  // if (!updateRole.employeeRole) {
  //   updateRole.employeeRole = [];
  // }

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



module.exports = { updateRole, displayRoles };