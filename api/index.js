const express = require("express");
const cors = require('cors');
const app = express(); // create express app
const authRoutes = require('./routes/auth.routes'); //
const port = process.env.port || 3001;

const DBcalls = require('./tools/sql.requests');
const { pool } = require("mssql");

app.use(cors());
app.use(express.json()); //allows server to handle json


//define my routes
app.use('/users', authRoutes);



// start express server on the enviroment port or port 3001
app.listen(port, err  => {
  if (err) {
    return console.log("Error: ", err);
  }
  console.log("server started on port " + port);
});