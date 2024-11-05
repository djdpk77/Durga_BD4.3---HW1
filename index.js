const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

app.use(cors());
app.use(express.json());

//app.use(express.static('static'));

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Function to fetch employees filtered by gender from the database
async function filterByGender(gender) {
  let query = 'SELECT * FROM employees WHERE gender = ?';
  let response = await db.all(query, [gender]);

  return { employees: response };
}

//Endpoint 1: Fetch All Employees by Gender
app.get('/employees/gender/:gender', async (req, res) => {
  let gender = req.params.gender;

  try {
    const results = await filterByGender(gender);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for gender : ' + gender });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch employees filtered by department from the database
async function filterByDepartment(department) {
  let query = 'SELECT * FROM employees WHERE department = ?';
  let response = await db.all(query, [department]);

  return { employees: response };
}

//Endpoint 2: Fetch All Employees by Department
app.get('/employees/department/:department', async (req, res) => {
  let department = req.params.department;

  try {
    const results = await filterByDepartment(department);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for department : ' + department });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch employees filtered by job title from the database.
async function filterByJobTitle(job_title) {
  let query = 'SELECT * FROM employees WHERE job_title = ?';
  let response = await db.all(query, [job_title]);

  return { employees: response };
}

//Endpoint 3: Fetch All Employees by Job Title
app.get('/employees/job_title/:job_title', async (req, res) => {
  let job_title = req.params.job_title;

  try {
    const results = await filterByJobTitle(job_title);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for Job title : ' + job_title });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Function to fetch employees filtered by location from the database.
async function filterByLocation(location) {
  let query = 'SELECT * FROM employees WHERE location = ?';
  let response = await db.all(query, [location]);

  return { employees: response };
}

//Endpoint 4: Fetch All Employees by Location
app.get('/employees/location/:location', async (req, res) => {
  let location = req.params.location;

  try {
    const results = await filterByLocation(location);

    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: 'No employees found for location : ' + location });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
