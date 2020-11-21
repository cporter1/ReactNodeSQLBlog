const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const DBcalls = require('../tools/sql.requests');

// routes from '/users/...'
router
    .post('/signIn', async (req,res) => {
      DBcalls.DBgetAccount(req.body.email)
          .then(async result => {

            //CHECK TO SEE IF HASHED PASSWORDS MATCH
              if( await bcrypt.compare( req.body.password, result[0]['Password'])) {
                req.session.user = {'email': result[0]['Email']};

                DBcalls.DBsaveSession(req.body.sessionID, req.body.email)
                  .then(res.send(result).status(200))
                  .catch(err => {console.log(err); res.sendStatus(500)})

                res.send(result);
              }

              //PASSWORDS DO NOT MATCH
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
          res.sendStatus(500)
        })
    })
    .post('/signOut', async (req,res) => {
      console.log(req.body);
      DBcalls.DBdeleteSession(req.sessionID)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })




module.exports = router;
