const express = require('express');
const router  = express.Router(); 
const DBcalls = require('../tools/sql.requests.js');

//middleware to ensure session cookie exists and has the correct username
const isSessionValid = (req,res,next) => {
  DBcalls.DBgetSession(req.body.sessionID)
    .then(result => {
      if(result[0]['Email'] === req.body.email){
        next()
      }
      else {
        res.sendStatus(401)
      }

    })
    .catch( err => {
      console.log(err)
      res.sendStatus(500)
    })
};

// routes from '/posts/...'
router
    .post('/newPost', isSessionValid, async (req,res) => {
        DBcalls.DBcreatePost(req.body.title, req.body.author, req.body.body,
            req.body.timePosted, req.body.postID)
            .then(res.sendStatus(200))
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
    })
    .post('/newComment', isSessionValid, async (req,res) => {
        DBcalls.DBcreateComment(req.body.body, req.body.author, req.body.timePosted,
            req.body.parentID, req.body.commentID, req.body.postID, req.body.depth)
            .then(res.sendStatus(200))
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
    })
    .get('/getPosts', async (req,res) => {
        DBcalls.DBgetAllPosts()
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
    })
    .get('/post/:postID', async (req,res) => {
        DBcalls.DBgetPost(req.params['postID'])
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
    })
    .get('/comments/:postID', async (req,res) => {
        DBcalls.DBgetComments(req.params['postID'])
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err =>{
                console.log(err);
                res.sendStatus(500)
            })
    })
    .get('/profile/:username', async (req,res) => {
        DBcalls.DBgetProfile(req.params['username'])
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
    })
    
module.exports = router;