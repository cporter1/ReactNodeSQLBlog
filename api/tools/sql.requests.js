const sql = require('mssql');
const DBLogin = require('../config/db.config.js'); //fetch loginDetails from config/db.config.js
const cors = require('cors');


async function DBgetAccount(argEmail) {

    const DBquery = 
    `SELECT * FROM users WHERE email = '${argEmail}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);

    pool.close;
    sql.close;
    console.log('data: ', data)
    return data;
}

async function DBcreateAccount(argEmail, argPassword, argName,) {
    //create query for this function
    let DBquery = 
        `INSERT INTO users (email, username, password) \
        VALUES ('${argEmail}', '${argName}', '${argPassword}')`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);
    console.log('data: ', data)
    
    pool.close;
    sql.close;      

    return data;
}

//export the db call functions
exports.DBgetAccount = DBgetAccount;
exports.DBcreateAccount = DBcreateAccount;