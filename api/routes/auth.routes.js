const express = require('express');
const sql = require('mssql');
const router = express.Router();
const bcrypt = require('bcrypt');
const DBcalls = require('../tools/sql.requests');

//routes to '/users/'
// router
//     .post('/login', async (req,res) => {
//         try {

//         } catch {

//         }
//     })
//     .post('/createaccount', async (req, res) => {
//         try {
//             DBcalls.DBcreateAccount(
//                 req.body.email,req.body.name, 
//                 req.body.password
//                 );
//             res.status(201).send()
//         } catch {
//             res.status(500).send();
//         }
//     });




module.exports = router;