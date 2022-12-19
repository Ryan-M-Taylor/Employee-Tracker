// Description: This file contains all the helper functions for the application

// imports the question prompts from the questions.js file
const questions = require("./questions");
const db = require("../config/connection");
const inquirer = require("inquirer");

// function to initialize program
const promptUser = async () => {
  let data = await inquirer.prompt(questions.promptQuestions);

  switch (data.action) {
    case "View all departments":
      allDepartments();
      break;
    case "View all roles":
      allRoles();
      break;
    case "View all employees":
      allEmployees();
      break;
    case "View all employees by department":
      allEmployeesByDepartment();
      break;
    case "Add employee":
      addEmployeePrompt();
      break;
    case "Add role":
      addRole();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Remove department":
      deleteDepartment();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "Remove role":
      deleteRole();
      break;
    case "Remove employee":
      deleteEmployee();
      break;
    case "View all employees by manager":
      viewEmployeesByManager();
      break;
    case "Update employee manager":
      updateEmployeeManager();
      break;
    case "View total utilized budget of a department":
      viewBudget();
      break;
    case "Quit":
      quit();
      break;
  }
};

// function to view all departments
const allDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    promptUser();
  });
};

// function to view all roles
const allRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    promptUser();
  });
};

// function to view all employees
const allEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    promptUser();
  });
};

// function to view all employees by department
const allEmployeesByDepartment = () => {
  db.query(
    "SELECT CONCAT(employee.first_name,' ',employee.last_name) AS names, department.name AS department FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id ORDER BY department.name;",
    function (err, results) {
      console.table(results);
      promptUser();
    }
  );
};

// function to add an employee
const addEmployee = (employeeInfo) => {
  var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeInfo.first_name}','${employeeInfo.last_name}',${employeeInfo.role_id},${employeeInfo.manager_id})`;
  db.query(sql, function (err, results) {
    console.log("Employee added!");
    allEmployees();
  });
};

// function to start the add employee prompt
const addEmployeePrompt = async () => {
  let data = await inquirer.prompt(questions.addEmployeeQuestions);
  addEmployee(data);
};

// function to start the add role prompt
const addRoleQuestions = (departmentOptions) => {
  return [
    { type: "input", name: "title", message: "What is the role's title?" },
    { type: "input", name: "salary", message: "What is the role's salary?" },
    {
      type: "list",
      name: "department_id",
      message: "What is the role's department id?",
      choices: departmentOptions,
    },
  ];
};

//function to add a role
const addRole = async () => {
  let departmentOptions = await db
    .promise()
    .query("SELECT id AS value, name AS name FROM department");
  console.log(departmentOptions[0]);
  let data = await inquirer.prompt(addRoleQuestions(departmentOptions[0]));
  var sql = `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}',${data.salary},${data.department_id})`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Role added!");
      allRoles();
    }
  });
};

// function to add department
const addDepartment = async () => {
  let data = await inquirer.prompt(questions.addDepartmentQuestions);
  var sql = `INSERT INTO department (name) VALUES ('${data.name}')`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Department added!");
      allDepartments();
    }
  });
};

// function to update employee role
const updateEmployeeRole = async () => {
  let data = await inquirer.prompt(questions.employeeRoleQuestions);
  var sql = `UPDATE employee SET role_id = ${data.role_id} WHERE id = ${data.id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee role updated!");
      allEmployees();
    }
  });
};

// function to delete a department
const deleteDepartment = async () => {
  let data = await inquirer.prompt(questions.deleteDepartmentQuestions);
  var sql = `DELETE FROM department WHERE id = ${data.id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Department deleted!");
      allDepartments();
    }
  });
};

// function to delete a role
const deleteRole = async () => {
  let data = await inquirer.prompt(questions.deleteRoleQuestions);
  var sql = `DELETE FROM role WHERE id = ${data.id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Role deleted!");
      allRoles();
    }
  });
};

// function to delete an employee
const deleteEmployee = async () => {
  let data = await inquirer.prompt(questions.deleteEmployeeQuestions);
  var sql = `DELETE FROM employee WHERE id = ${data.id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee deleted!");
      allEmployees();
    }
  });
};

// function to view all employees by manager
const viewEmployeesByManager = () => {
  var sql = `SELECT CONCAT(employee.first_name,' ',employee.last_name) AS names, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee INNER JOIN employee manager ON employee.manager_id=manager.id ORDER BY manager.first_name;`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
    promptUser();
  });
};

// function to update employee manager
const updateEmployeeManager = async () => {
  let data = await inquirer.prompt(questions.updateEmployeeManagerQuestions);
  var sql = `UPDATE employee SET manager_id = ${data.manager_id} WHERE id = ${data.id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Employee manager updated!");
      allEmployees();
    }
  });
};

// function to view utilized budget by department
const viewBudget = async () => {
  let data = await inquirer.prompt(questions.viewBudgetQuestions);
  var sql = `SELECT department.name AS department, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${data.department_id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
    promptUser();
  });
};

// function to quit program
const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

module.exports = {
  promptUser,
  allEmployees,
  allRoles,
  allDepartments,
  addEmployeePrompt,
  addRole,
  addDepartment,
  updateEmployeeRole,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewEmployeesByManager,
  allEmployeesByDepartment,
  updateEmployeeManager,
  viewBudget,
  quit,
};
