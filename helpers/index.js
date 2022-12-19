const questions = require("./questions");

const allDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    console.log(results);
  });
};

const allRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    promptUser();
  });
};

const allEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    promptUser();
  });
};

const allEmployeesByDepartment = () => {
  db.query(
    "SELECT CONCAT(employee.first_name,' ',employee.last_name) AS employee_Names, department.name AS department_Names FROM employee INNER JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id;",
    function (err, results) {
      console.table(results);
      promptUser();
    }
  );
};

const addEmployee = (employeeInfo) => {
  var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeInfo.first_name}','${employeeInfo.last_name}',${employeeInfo.role_id},${employeeInfo.manager_id})`;
  db.query(sql, function (err, results) {
    console.log("Employee added!");
    allEmployees();
  });
};

const addEmployeePrompt = async () => {
  let data = await inquirer.prompt(questions.addEmployeeQuestions);
  addEmployee(data);
};

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

const addRole = async () => {
  let departmentOptions = await db
    .promise()
    .query("SELECT id AS value, name AS name FROM department");
  console.log(departmentOptions[0]);

  //[{value: id, name: department_name}]
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

const viewEmployeesByManager = async () => {
  let data = await inquirer.prompt(questions.viewEmployeesByManagerQuestions);
  var sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ${data.manager_id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

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

const viewBudget = async () => {
  let data = await inquirer.prompt(questions.viewBudgetQuestions);
  var sql = `SELECT department.name AS department, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${data.department_id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

module.exports = {
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
