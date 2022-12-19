-- Description: Contains all the queries for the database

-- Views all the departments in the database
SELECT * FROM department

-- Views all the roles in the database
SELECT * FROM role

-- Views all the employees in the database
SELECT * FROM employee

-- Adds a department to the database
INSERT INTO department (name)
VALUES ("name of department");

-- Adds a role to the database
INSERT INTO role (title, salary, department_id)
VALUES ("title of role", salary, department_id);

-- Adds an employee to the database
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("first name", "last name", role_id, manager_id);

-- Updates a role in the database
UPDATE role
SET title = "new title", salary = new_salary, department_id = new_department_id
WHERE id = role_id;

-- Deletes a department from the database
DELETE FROM department
WHERE id = department_id;

-- Deletes a role from the database
DELETE FROM role
WHERE id = role_id;

-- Deletes an employee from the database
DELETE FROM employee
WHERE id = employee_id;

-- Views all employees by department
SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS names, department.name AS department
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
ORDER BY department.name;

-- Views all employees by manager
SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, CONCAT(employee.first_name, ' ', employee.last_name) AS employee
FROM employee
INNER JOIN employee manager ON employee.manager_id = manager.id
ORDER BY manager.first_name;

-- Views the total utilized budget of a department
SELECT department.name AS department, SUM(role.salary) AS utilized_budget
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id WHERE department.id = department_id
