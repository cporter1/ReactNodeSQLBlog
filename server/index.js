const express = require("express");
const cors = require('cors');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express(); // create express app
app.use(bodyParser.json());

const PORT = 3001;

let config = {
  user: 'Eric',
  password: 'pass',
  server: '10.0.0.97',
  database: 'sqldb'
};

app.use(cors());

app.get('/sql', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM Vehicles', function (err, recordset) {

      if (err) console.log(err);

      // send records as a response
      res.send(recordset.recordset);

    });
  });
});

<<<<<<< HEAD
app.post("/new-account", function (req, res) {
  sql.connect(config, function (err) {

    console.log(req);

=======
app.post("/signIn", function (req, res) {
  sql.connect(config, function (err) {

>>>>>>> dbc33bb7f73799fe6cb8beb5b378a8f5c209ef92
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
<<<<<<< HEAD

    // query to the database and get the records
    request.query('INSERT INTO Accounts VALUES ('Eric', 'ericthiem23@gmail.com', 'pass')', function (err, response) {

      if (err) console.log(err);

      // send records as a response
      res.send(response);
=======
    let query = `SELECT * FROM Accounts Where Email = '${req.body.email}'`;

    // query to the database and get the records
    request.query(query, function (err, response) {

      if (err) console.log(err);

      if(response.recordset[0]['Password'] !== req.body.password){
        res.statusMessage = "Password does not match for this email";
        res.status(400).end();
      }

      // send records as a response
      res.statusMessage = "Successful sign in.";
      res.status(200).send(response.recordset);
>>>>>>> dbc33bb7f73799fe6cb8beb5b378a8f5c209ef92

    });
  });
});

<<<<<<< HEAD

=======
app.post("/createAccount", function (req, res) {
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
    let query = `INSERT INTO Accounts VALUES ('${req.body.email}', '${req.body.username}', '${req.body.password}')`;

    // query to the database and get the records
    request.query(query, function (err, response) {

      if (err) console.log(err);

      // send records as a response
      res.send(response);

    });
  });
});
>>>>>>> dbc33bb7f73799fe6cb8beb5b378a8f5c209ef92
  
app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/api/hey", (req, res) => {
  res.send("Hello from the Node.js server!");
});

// start express server on port 5000
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});