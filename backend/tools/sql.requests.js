const sql     = require('mssql');
const DBLogin = require('../config/db.config.js'); //fetch loginDetails from config/db.config.js

async function DBgetAccount(accEmail) {
    const DBquery =
      `SELECT * FROM Accounts WHERE Email = '${accEmail}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBcreateAccount(accEmail, accPassword, accName,) {
    //create query for this function
    let DBquery = 
        `INSERT INTO Accounts (email, username, password) \
        VALUES ('${accEmail}', '${accName}', '${accPassword}')`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBcreatePost(postTitle, postAuthor, postBody, postTime, postID) {
    let DBquery = 
        `INSERT INTO Posts VALUES ('${postTitle}', '${postAuthor}',
            '${postBody}', '${postTime}', '${postID}', '0')`;
    
    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBcreateComment(commentBody, commentAuthor, 
    commentTime, commentParentID, commentID, postID, commentDepth) {
    let DBquery = 
    `INSERT INTO Comments VALUES ('${commentBody}', '${commentAuthor}', 
        '${commentTime}', '${commentParentID}', '${commentID}', '${postID}', 
        '${commentDepth}')`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBgetAllPosts() {
    let DBquery = 'SELECT * FROM Posts ORDER BY TimePosted'

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBgetPost(postID) {
    let DBquery = `SELECT * FROM Posts WHERE PostID = '${postID}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBgetComments(postID) {
    let DBquery = `SELECT * FROM Comments 
        WHERE PostID = '${postID}' 
        ORDER BY TimePosted`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBgetProfile(profileUserName) {
    let DBquery = `SELECT [Title], [Author], [Body], [TimePosted], [PostID], 
            NULL AS [ParentID], NULL AS [CommentID], NULL AS [Depth] 
        FROM Posts WHERE Author='${profileUserName}' 
        UNION All
        SELECT NULL AS [Title], [Author], [Body], [TimePosted], [PostID], 
            [ParentID], [CommentID], [Depth] From Comments 
        WHERE Author='${profileUserName}'
        ORDER BY TimePosted DESC;`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();

    return data.recordset;
}

async function DBgetSession(sessionID) {
    let DBquery = `SELECT * FROM Sessions 
        WHERE sessionID = '${sessionID}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBsaveSession(sessionID, email, maxAge) {
    let DBquery = `INSERT INTO Sessions VALUES 
        ('${sessionID}', '${email}', '${maxAge}')`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBdeleteSession(sessionID) {
    let DBquery = `DELETE FROM Sessions 
        WHERE sessionID = '${sessionID}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    pool.close();
    sql.close();
    return data.recordset;
}

async function DBUpvote(id, username) {
    let pool = await sql.connect(DBLogin);
    let upvoteQuery = `SELECT 1 FROM sys.columns WHERE Name = '${username}'`;
    let data;
    try {
        data = await pool.request().query(upvoteQuery);
    } catch (e) {}

    if(data.recordset[0] && data.recordset[0][''] === 1){
        //User already exists on the upvote table
        await pool.request().query(`INSERT INTO Upvotes (${username}) VALUES ('${id}')`);
    } else {
        //User does not already exist on the upvote table
        await pool.request().query(`ALTER TABLE Upvotes ADD ${username} varchar(255)`)
          .then(await pool.request().query(`INSERT INTO Upvotes (${username}) VALUES ('${id}')`));
    }

    let DBquery = `UPDATE Posts SET Upvotes = Upvotes + 1 WHERE PostID = '${id}'`;
    await pool.request().query(DBquery);
    pool.close();
    sql.close();
}

async function DBDownvote(id) {
    let DBquery = `UPDATE Posts SET Upvotes = Upvotes - 1 WHERE PostID = '${id}'`;

    let pool = await sql.connect(DBLogin);
    await pool.request().query(DBquery);
    pool.close();
    sql.close();
}

async function DBgetUpvoted(username) {
    let data;
    let DBquery = `SELECT ${username} FROM Upvotes`;

    let pool = await sql.connect(DBLogin);
    try {
        data = await pool.request().query(DBquery);

    } catch (e) {
        pool.close();
        sql.close();
        return [];
    }
    pool.close();
    sql.close();
    return data.recordset;
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
exports.DBUpvote        = DBUpvote;
exports.DBDownvote      = DBDownvote;
exports.DBgetUpvoted    = DBgetUpvoted;