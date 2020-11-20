const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const DBcalls = require('../tools/sql.requests');

// routes from '/users/...'
router
    .post('/login', async (req,res) => {
        DBcalls.DBgetAccount(req.body.email)
            .then(async result => {
                if( await bcrypt.compare( req.body.password, 
                        result.recordset[0]['password'])) {
                    const user = {'email': result.recordset[0].email, 
                                  'username' : result.recordset[0].username
                    }
                    req.session.user = user
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
                res.sendStatus(500);
            })
    });




module.exports = router;
