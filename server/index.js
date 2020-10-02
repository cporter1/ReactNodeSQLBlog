const express = require("express");
const cors = require('cors');
const app = express(); // create express app

app.use(cors());

app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/api/hey", (req, res) => {
  res.send("Hello from the Node.js server!");
});

// start express server on port 5000
app.listen(8000, () => {
  console.log("server started on port 3001");
});