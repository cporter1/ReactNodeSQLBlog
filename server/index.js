const express = require("express");
const cors = require('cors');
const app = express(); // create express app

app.use(cors());

app.get("/api/hey", (req, res) => {
  res.send("This is the Sign In Page");
});

// start express server on port 5000
app.listen(3001, () => {
  console.log("server started on port 3001");
});