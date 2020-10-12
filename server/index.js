const express = require("express");
const cors = require('cors');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express(); // create express app
app.use(bodyParser.json());

const PORT = 3001;
let counter = 0;

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

app.post("/signIn", function (req, res) {
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
    let query = `SELECT * FROM Accounts WHERE Email = '${req.body.email}'`;

    // query to the database and get the records
    request.query(query, function (err, response) {

      // SERVER ERROR
      if(err){
        console.log("ERR FROM THIS IS: " +  err);
        console.log("This is the error response: " + response);
        res.statusCode = 500;
        res.end();
      }

      // EMAIL DOES NOT EXIST IN THE DATABASE
      if(Object.keys(response.recordset).length === 0){
        res.statusMessage = "Email Not Found";
        res.statusCode = 404;
        res.end();
      }

      // EMAIL EXISTS IN THE DATABASE BUT THE GIVEN PASSWORD DOES NOT MATCH
      else if(response.recordset[0]['Password'] !== req.body.password){
        res.statusMessage = "Password does not match for this email";
        res.statusCode = 401;
        res.end();
      }

      // SUCCESSFUL LOGIN
      else {
        //res.statusMessage = "Successful sign in.";
        //res.status = 200;
        res.send(response.recordset);
      }

    });
  });
});

app.post("/createAccount", function (req, res) {
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // CHECK TO SEE IF THERE ARE MORE THAN ONE ENTRY FOR AN EMAIL IN THE DATABASE
    let check_request = new sql.Request();
    let check_query = `SELECT COUNT(1) From Accounts Where Email = '${req.body.email}'`;

    check_request.query(check_query, function (err, response) {

      if (err) console.log(err);

      // Check to see if the number of that email is greater than one is greater than
      let numEmails = response.recordset[0][''];
      if (numEmails > 0){
        res.statusCode = 406;
        res.end();
      }

      //There are no accounts with that email in the database
      else {
        let request = new sql.Request();
        let query = `INSERT INTO Accounts VALUES ('${req.body.email}', '${req.body.username}', '${req.body.password}')`;

        // query to the database and get the records
        request.query(query, function (err, response) {

          if (err) console.log(err);

          // Account successfully created
          res.send(response);

        });
      }
    });
  });
});

app.post("/newPost", function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    let request = new sql.Request();
    let query = `INSERT INTO Posts VALUES ('${req.body.title}', '${req.body.author}', '${req.body.body}', '${req.body.timePosted}', '${req.body.postID}')`;

    // query to the database and get the records
    request.query(query, function (err, response) {

      if (err) console.log(err);

      // Account successfully created
      res.send(response);
    });
  });
});

app.get("/getPosts", (req, res) => {

  // connect to your database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM Posts', function (err, response) {

      if (err) console.log(err);

      // send records as a response
      res.send(response.recordset);

    });
  });
});

app.get('/post/:postID', function (req, res) {

  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();

    // query to the database and get the records
    request.query(`SELECT * FROM Posts WHERE PostID = '${req.params['postID']}'`, function (err, response) {

      if (err) console.log(err);

      // send records as a response
      res.send(response.recordset);

    });
  });
});
  
app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/api/hey", (req, res) => {
  res.send("Hello from the Node.js server!");
});

app.get('/counter', function(req, res){
  counter++;
  res.send("You have connected "+ counter + " times");
});

// start express server on port 5000
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});