const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { type } = require("os");
const employeeFunctions = require("./helpers/index");
const promptQuestions = require("./helpers/questions");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);

const promptUser = async () => {
  let data = await inquirer.prompt(promptQuestions.promptQuestions);

  switch (data.action) {
    case "View all departments":
      employeeFunctions.allDepartments();
      break;
    case "View all roles":
      employeeFunctions.allRoles();
      break;
    case "View all employees":
      employeeFunctions.allEmployees();
      break;
    case "View all employees by department":
      employeeFunctions.allEmployeesByDepartment();
      break;
    case "Add employee":
      employeeFunctions.addEmployeePrompt();
      break;
    case "Add role":
      employeeFunctions.addRole();
      break;
    case "Add department":
      employeeFunctions.addDepartment();
      break;
    case "Update employee role":
      employeeFunctions.updateEmployeeRole();
      break;
    case "Remove Department":
      employeeFunctions.deleteDepartment();
      break;
    case "Remove Role":
      employeeFunctions.deleteRole();
      break;
    case "Remove Employee":
      employeeFunctions.deleteEmployee();
      break;
    case "View all employees by manager":
      employeeFunctions.viewEmployeesByManager();
      break;
    case "Update employee manager":
      updateEmployeeManager();
      break;
    case "View total utilized budget of a department":
      employeeFunctions.viewBudget();
      break;
    case "Quit":
      employeeFunctions.quit();
      break;
  }
};

// const promptQuestions = [
//   {
//     type: "list",
//     name: "action",
//     message: "What would you like to do?",
//     choices: [
//       "View all employees",
//       "View all employees by department",
//       "View all employees by manager",
//       "Add employee",
//       "Remove employee",
//       "Update employee role",
//       "Update employee manager",
//       "View all roles",
//       "Add role",
//       "Remove role",
//       "View all departments",
//       "Add department",
//       "Remove department",
//       "View total utilized budget of a department",
//       "Quit",
//     ],
//   },
// ];

// const allDepartments = () => {
//   db.query("SELECT * FROM department", function (err, results) {
//     console.table(results);
//     console.log(results);
//   });
// };

// const allRoles = () => {
//   db.query("SELECT * FROM role", function (err, results) {
//     console.table(results);
//     promptUser();
//   });
// };

// const allEmployees = () => {
//   db.query("SELECT * FROM employee", function (err, results) {
//     console.table(results);
//     promptUser();
//   });
// };

// const allEmployeesByDepartment = () => {
//   db.query(
//     "SELECT CONCAT(employee.first_name,' ',employee.last_name) AS employee_Names, department.name AS department_Names FROM employee INNER JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id;",
//     function (err, results) {
//       console.table(results);
//       promptUser();
//     }
//     );
//   };
  
  // const addEmployee = (employeeInfo) => {
  //   var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeInfo.first_name}','${employeeInfo.last_name}',${employeeInfo.role_id},${employeeInfo.manager_id})`;
  //   db.query(sql, function (err, results) {
  //     console.log('Employee added!')
  //     allEmployees()
  //   });
  // };
  
  // const addEmployeeQuestions = [
  //   {type: "input",
  //   name: "first_name",
  //   message: "What is the employee's first name?"},
  //   {type: "input",
  //   name: "last_name",
  //   message: "What is the employee's last name?"},
  //   {type: "input",
  //   name: "role_id",
  //   message: "What is the employee's role id?"},
  //   {type: "input",
  //   name: "manager_id",
  //   message: "What is the employee's manager id?"},
  // ];
  
//   const addEmployeePrompt = async () => {
//     let data = await inquirer.prompt(addEmployeeQuestions);
//     addEmployee(data);
//   };
  
//   const addRoleQuestions = (departmentOptions)=>{
//     return [
//       {type: "input",
//       name: "title",
//       message: "What is the role's title?"},
//       {type: "input",
//       name: "salary",
//       message: "What is the role's salary?"},
//       {type: "list",
//       name: "department_id",
//       message: "What is the role's department id?",
//       choices: departmentOptions
//     }
//   ];
// }

// const addRole = async () => {
//   let departmentOptions = await db.promise().query("SELECT id AS value, name AS name FROM department")
//   console.log(departmentOptions[0])
  
//   //[{value: id, name: department_name}]
//   let data = await inquirer.prompt(addRoleQuestions(departmentOptions[0]));
//   var sql = `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}',${data.salary},${data.department_id})`;
//   db.query(sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Role added!')
//       allRoles()
//     }
//   });
// }

// const addDepartmentQuestions = [
//   {type: "input",
//   name: "name",
//   message: "What is the department's name?"},
// ];

// const addDepartment = async () => {
//   let data = await inquirer.prompt(addDepartmentQuestions);
//   var sql = `INSERT INTO department (name) VALUES ('${data.name}')`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Department added!')
//       allDepartments()
//     }
//   });
// }

// const employeeRoleQuestions = [
//   {type: "input",
//   name: "id",
//   message: "What is the employee's id?"},
//   {type: "input",
//   name: "role_id",
//   message: "What is the employee's new role id?"},
// ];

// const updateEmployeeRole = async () => {
//   let data = await inquirer.prompt(employeeRoleQuestions);
//   var sql = `UPDATE employee SET role_id = ${data.role_id} WHERE id = ${data.id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Employee role updated!')
//       allEmployees()
//     }
//   });
// }

// const deleteDepartmentQuestions = [
//   {type: "input",
//   name: "id",
//   message: "What is the department's id?"},
// ];

// const deleteDepartment = async () => {
//   let data = await inquirer.prompt(deleteDepartmentQuestions);
//   var sql = `DELETE FROM department WHERE id = ${data.id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Department deleted!')
//       allDepartments()
//     }
//   });
// }

// const deleteRoleQuestions = [
//   {type: "input",
//   name: "id",
//   message: "What is the role's id?"},
// ];

// const deleteRole = async () => {
//   let data = await inquirer.prompt(deleteRoleQuestions);
//   var sql = `DELETE FROM role WHERE id = ${data.id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Role deleted!')
//       allRoles()
//     }
//   });
// }

// const deleteEmployeeQuestions = [
//   {type: "input",
//   name: "id",
//   message: "What is the employee's id?"},
// ];

// const deleteEmployee = async () => {
//   let data = await inquirer.prompt(deleteEmployeeQuestions);
//   var sql = `DELETE FROM employee WHERE id = ${data.id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Employee deleted!')
//       allEmployees()
//     }
//   });
// }

// const viewEmployeesByManagerQuestions = [
//   {type: "input",
//   name: "manager_id",
//   message: "What is the manager's id?"},
// ];

// const viewEmployeesByManager = async () => {
//   let data = await inquirer.prompt(viewEmployeesByManagerQuestions);
//   var sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ${data.manager_id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.table(results)
//     }
//   });
// }

// const updateEmployeeManagerQuestions = [
//   {type: "input",
//   name: "id",
//   message: "What is the employee's id?"},
//   {type: "input",
//   name: "manager_id",
//   message: "What is the employee's new manager id?"},
// ];

// const updateEmployeeManager = async () => {
//   let data = await inquirer.prompt(updateEmployeeManagerQuestions);
//   var sql = `UPDATE employee SET manager_id = ${data.manager_id} WHERE id = ${data.id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('Employee manager updated!')
//       allEmployees()
//     }
//   });
// }

// const viewBudgetQuestions = [
//   {type: "input",
//   name: "department_id",
//   message: "What is the department's id?"},
// ];

// const viewBudget = async () => {
//   let data = await inquirer.prompt(viewBudgetQuestions);
//   var sql = `SELECT department.name AS department, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${data.department_id}`;
//   db.query
//   (sql, function (err, results) {
//     if(err){
//       console.log(err)
//     }else{
//       console.table(results)
//     }
//   });
// }

// const quit = () => {
//   console.log('Goodbye!')
//   process.exit()
// }

promptUser();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});