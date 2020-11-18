const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const DBcalls = require('../tools/sql.requests');

//middleware to ensure session cookie exists
const validSession = (req,res,next) => {
    if(!req.session.email) {
        res.sendStatus(401)
    }
    else {
        next()
    }
}
// routes from '/users/...'
router
    .post('/login', async (req,res) => {
        DBcalls.DBgetAccount(req.body.email)
            .then(result => {
                if( await bcrypt.compare( req.body.password, result.recordset[0]['password'])) {
                    req.session.email = req.body.email
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
