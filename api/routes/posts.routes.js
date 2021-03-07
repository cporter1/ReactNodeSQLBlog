const express = require('express');
const router  = express.Router(); 
const DBcalls = require('../tools/sql.requests.js');
// all the routes for post related requests

//middleware to ensure session cookie exists and has the correct username
const isSessionValid = (req,res,next) => {
    try {
        console.log('sessionID: ', req.sessionID, ' ', req.session.email)
        //check if session and email exist in the request
        if(req.session && req.session.email) {
            // look up sessionID in DB
            DBcalls.DBgetSession(req.sessionID)
            .then(result => {
                const matchingEmail  = result[0]['Email'] === req.session.email
                const expiredSession = result[0]['MaxAge'] < Date.now()
                // if email matches DB session email and if sessions has not expired
                if(matchingEmail && !expiredSession) {
                    next()
                }
                else {
                    res.sendStatus(401)
                }
            })
            .catch(err => {console.log(err); res.sendStatus(500)})
        }
        else {res.sendStatus(401)}
    }
    catch {res.sendStatus(401)}
};

// routes from '/posts/...'
router // for making a new post
    .post('/newPost', isSessionValid, async (req,res) => {
        DBcalls.DBcreatePost(req.body.title, req.body.author, req.body.body,
            req.body.timePosted, req.body.postID)
            .then(res.sendStatus(200))
            .catch(err => {console.log(err); res.sendStatus(500)})
    }) // for making a new comment
    .post('/newComment', isSessionValid, async (req,res) => {
        DBcalls.DBcreateComment(req.body.body, req.body.author, req.body.timePosted,
            req.body.parentID, req.body.commentID, req.body.postID, req.body.depth)
            .then(res.sendStatus(200))
            .catch(err => {console.log(err);res.sendStatus(500)})
    }) // get all the posts
    .get('/getPosts', async (req,res) => {
        DBcalls.DBgetAllPosts()
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err => {console.log(err);res.sendStatus(500)})
    }) // get post by ID
    .get('/post/:postID', async (req,res) => {
        DBcalls.DBgetPost(req.params['postID'])
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err => {console.log(err);res.sendStatus(500)})
    }) //get comment by ID
    .get('/comments/:postID', async (req,res) => {
        DBcalls.DBgetComments(req.params['postID'])
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err =>{console.log(err);res.sendStatus(500)})
    }) // get public profile by username
    .get('/profile/:username', async (req,res) => {
        DBcalls.DBgetProfile(req.params['username'])
            .then(async result => {
                res.send(result).status(200)
            })
            .catch(err => {console.log(err);res.sendStatus(500)})
    })
    
module.exports = router;