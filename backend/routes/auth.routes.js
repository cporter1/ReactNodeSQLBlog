const express = require('express')
const router  = express.Router();
const bcrypt  = require('bcrypt');
const DBcalls = require('../tools/sql.requests');

// routes from '/users/...'
router.post('/signIn', async (req,res) => {

      DBcalls.DBgetAccount(req.body.email)
          .then(async result => {

            console.log(result);

            //CHECK TO SEE IF HASHED PASSWORDS MATCH
              if( await bcrypt.compare( req.body.password, result[0]['Password'])) {
                req.session.email = req.body.email
                //console.log(req.session)
                DBcalls.DBsaveSession(req.sessionID, req.body.email, Date.now() + (1000*60*10))
                  .then(res.send(result).status(200))
                  .catch(err => {console.log(err); res.sendStatus(500)})
                }

              //PASSWORDS DO NOT MATCH
              else {
                res.status(401).send();
              };

          })
          .catch(err => {console.log(err);res.sendStatus(500);});
    })

router.post('/createAccount', async (req, res) => {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      DBcalls.DBcreateAccount(req.body.email, hashedPassword, req.body.username)
        .then(result => {
          res.sendStatus(200)
        })
        .catch(err => {res.sendStatus(500)})
    })

router.post('/signOut', async (req,res) => {
      const ID = req.sessionID
      req.session.destroy()
      req.sessionID = null
      
      DBcalls.DBdeleteSession(ID)
        .then(res.sendStatus(200))
        .catch(err => {console.log(err); res.sendStatus(500)})
    });

module.exports = router;
