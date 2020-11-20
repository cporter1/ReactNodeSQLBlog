const sql     = require('mssql');
const DBLogin = require('../config/db.config.js'); //fetch loginDetails from config/db.config.js

async function DBgetAccount(accEmail) {
    const DBquery = 
    `SELECT * FROM users WHERE email = '${accEmail}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;
    return data;
}

async function DBcreateAccount(accEmail, accPassword, accName,) {
    //create query for this function
    let DBquery = 
        `INSERT INTO users (email, username, password) \
        VALUES ('${accEmail}', '${accName}', '${accPassword}')`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      
    return data;
}

async function DBcreatePost(postTitle, postAuthor, postBody, postTime, postID) {
    let DBquery = 
        `INSERT INTO Posts VALUES ('${postTitle}', '${postAuthor}',
            '${postBody}', '${postTime}', '${postID}')`;
    
    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      
    return data;
}

async function DBcreateComment(commentBody, commentAuthor, 
    commentTime, commentParentID, commentID, commentDepth) {
    let DBquery = 
    `INSERT INTO Comments VALUES ('${commentBody}', '${commentAuthor}', 
        '${commentTime}', '${commentParentID}', '${commentID}', 
        '${commentDepth}', '${req.body.depth}')`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      
    return data;
}

async function DBgetAllPosts() {
    let DBquery = 'SELECT * FROM Posts ORDER BY TimePosted'

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      
    return data;
}

async function DBgetPost(postID) {
    let DBquery = `SELECT * FROM Posts WHERE PostID = '${postID}'`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      
    return data;
}

async function DBgetComments(postID) {
    let DBquery = `SELECT * FROM Comments 
        WHERE PostID = '${postID}' 
        ORDER BY TimePosted`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      
    return data;
}

async function DBgetProfile(profileUserName) {
    let DBquery = `SELECT [Title], [Author], [Body], [TimePosted], [PostID], 
            NULL AS [ParentID], NULL AS [CommentID], NULL AS [Depth] 
        FROM Posts WHERE Author='${profileUserName}' 
        UNION All
        SELECT NULL AS [Title], [Author], [Body], [TimePosted], [PostID], 
            [ParentID], [CommentID], [Depth] From Comments 
        WHERE Author='${profileUserName}'
        ORDER BY TimePosted DESC;`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      

    return data;
}

async function DBgetSession(sessionID) {
    let DBquery = `SELECT * FROM Sessions 
        WHERE sessionID = '${sessionID}'`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      

    return data;
}

async function DBsaveSession(sessionID, email) {
    let DBquery = `INSERT INTO Sessions VALUES ('${sessionID}', '${email}')`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      

    return data;
}

async function DBdeleteSession(sessionID) {
    let DBquery = `DELETE FROM Sessions 
        WHERE sessionID = '${sessionID}'`

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close;
    sql.close;      

    return data;
}


//export the DB call functions
exports.DBgetAccount    = DBgetAccount;
exports.DBcreateAccount = DBcreateAccount;
exports.DBcreatePost    = DBcreatePost;
exports.DBcreateComment = DBcreateComment;
exports.DBgetAllPosts   = DBgetAllPosts;
exports.DBgetPost       = DBgetPost;
exports.DBgetComments   = DBgetComments;
exports.DBgetProfile    = DBgetProfile;
exports.DBsaveSession   = DBsaveSession;
exports.DBdeleteSession = DBdeleteSession;
exports.DBgetSession    = DBgetSession;
exports.DBgetProfile    = DBgetProfile;
exports.DBgetProfile    = DBgetProfile;