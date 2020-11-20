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
    .post('/signIn', async (req,res) => {
        DBcalls.DBgetAccount(req.body.email)
            .then(async result => {
                if( await bcrypt.compare( req.body.password, result[0]['Password'])) {
                    req.session.email = req.body.email;
                    res.send(result).status(200)
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
    .post('/createAccount', async (req, res) => {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      DBcalls.DBcreateAccount(req.body.email, hashedPassword, req.body.username)
        .then(result => {
          res.sendStatus(200)
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
