const mysql = require('mysql2');
const inquirer = require('inquirer');
// const { startPrompt } = require('../server');

const con = mysql.createConnection(
  {host:'localhost', user: 'root', password: 'My-pass6', database: 'staff'}
);

async function displayDepartments() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'staff'});
  const [rows, fields] = await connection.execute(`SELECT * FROM department`);
  console.table(rows);
};

// async function addDepartment() {
//   const mysql = require('mysql2/promise');
//   const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'My-pass6', database: 'staff'});
//   const [rows, fields] = await connection.execute(`INSERT INTO department (name) VALUES (?)`);
//   console.table(rows);
// };

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
    
    con.promise().query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log('Added ' + departmentData.name + ' to the STAFF database');
    })
  })
  .then( () => con.end());
};

module.exports = { displayDepartments, addDepartment };