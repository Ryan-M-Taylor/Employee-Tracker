const promptQuestions = [
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "View total utilized budget of a department",
        "Quit",
      ],
    },
  ];

const addEmployeeQuestions = [
    {type: "input",
    name: "first_name",
    message: "What is the employee's first name?"},
    {type: "input",
    name: "last_name",
    message: "What is the employee's last name?"},
    {type: "input",
    name: "role_id",
    message: "What is the employee's role id?"},
    {type: "input",
    name: "manager_id",
    message: "What is the employee's manager id?"},
  ];
  
  const addDepartmentQuestions = [
    {type: "input",
    name: "name",
    message: "What is the department's name?"},
  ];

  const employeeRoleQuestions = [
    {type: "input",
    name: "id",
    message: "What is the employee's id?"},
    {type: "input",
    name: "role_id",
    message: "What is the employee's new role id?"},
  ];

  const deleteDepartmentQuestions = [
    {type: "input",
    name: "id",
    message: "What is the department's id?"},
  ];

  const deleteRoleQuestions = [
    {type: "input",
    name: "id",
    message: "What is the role's id?"},
  ];

  const deleteEmployeeQuestions = [
    {type: "input",
    name: "id",
    message: "What is the employee's id?"},
  ];

  const viewEmployeesByManagerQuestions = [
    {type: "input",
    name: "manager_id",
    message: "What is the manager's id?"},
  ];

  const updateEmployeeManagerQuestions = [
    {type: "input",
    name: "id",
    message: "What is the employee's id?"},
    {type: "input",
    name: "manager_id",
    message: "What is the employee's new manager id?"},
  ];

  const viewBudgetQuestions = [
    {type: "input",
    name: "department_id",
    message: "What is the department's id?"},
  ];

  module.exports = { promptQuestions, addEmployeeQuestions, addDepartmentQuestions, employeeRoleQuestions, deleteDepartmentQuestions, deleteRoleQuestions, deleteEmployeeQuestions, viewEmployeesByManagerQuestions, updateEmployeeManagerQuestions, viewBudgetQuestions };