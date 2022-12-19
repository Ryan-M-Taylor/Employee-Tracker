// Description: This file is the entry point to the application. It will start the server and listen on the port.
//imports the express package
const express = require("express");
//imports the helper functions
const employeeFunctions = require("./helpers/index");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

employeeFunctions.promptUser();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});