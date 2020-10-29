const express = require('express');
const sql = require('mssql');
const router = express.Router();
const bcrypt = require('bcrypt');
const DBcalls = require('../tools/sql.requests');

// routes to '/users'
router
    .post('/login', async (req,res) => {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashedpassword:   ',hashedPassword)

        DBcalls.DBgetAccount(req.body.email)
            .then(async result => {
                if( await bcrypt.compare( req.body.password, result.recordset[0]['password'])) {

                    res.send(result.recordset[0]).status(200)
                }
                else {
                    res.sendStatus(401)
                }   
            })
            .catch(err => {
                console.log(err);
                res.status().send(500);
            });
    })
    .post('/createaccount', async (req, res) => {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(req.body.username)
        DBcalls.DBcreateAccount(req.body.email, hashedPassword, req.body.username)
            .then(result => {
                res.sendStatus(201)
            })
            .catch(err => {
                console.log(' \n \n error: ', err);

                if(err.name === 'RequestError') {
                    res.sendStatus(409)
                }
                res.sendStatus(500);
            })
        
    });




module.exports = router;
