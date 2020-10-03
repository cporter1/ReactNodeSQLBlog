const express = require("express");
const cors = require('cors');
const app = express(); // create express app
const sql = require('mssql')

let config = {
  user: 'Eric',
  password: 'pass',
  server: '2601:647:5800:7000:a8e2:fe2c:3cbb:79fc',
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
  
app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/api/hey", (req, res) => {
  res.send("Hello from the Node.js server!");
});

// start express server on port 5000
app.listen(3001, () => {
  console.log("server started on port 3001");
});