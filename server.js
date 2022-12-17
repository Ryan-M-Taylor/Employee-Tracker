const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
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
  let data = await inquirer.prompt(promptQuestions);

  switch (data.action) {
    case "View all departments":
      allDepartments();
      break;
    case "View all roles":
      allRoles();
      break;
  }
};

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
      "Quit",
    ],
  },
];

const allDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    promptUser();
  });
};

const allRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    promptUser();
  });
};

promptUser();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
