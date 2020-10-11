const sql = require('mssql');
const DBLogin = require('../config/db.config.js'); //fetch loginDetails from config/db.config.js
const cors = require('cors');


async function getAccount(argEmail) {

    const DBquery = 
    `SELECT * FROM users WHERE email = '${argEmail}'`;

    sql.connect(DBLogin, async (err) => {

        if (err) {
            console.log(err);
            return;
        } 
        // create Request object
        let request = new sql.Request();

        // query to the database and get the records (data)
        request.query(DBquery, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(' DBgetAccount output: ', res.recordset);
            return (res.recordset);
        });
            
    });
};

async function DBgetAccount(argEmail) {

    const DBquery = 
    `SELECT * FROM users WHERE email = '${argEmail}'`;

    let pool = await sql.connect(DBLogin);
    let data = await pool.request().query(DBquery);

    pool.close;
    sql.close;

    console.log(data);
    return data;

}

async function DBcreateAccount(email,name,password) {
    //create query for this function
    let DBquery = 
        "INSERT INTO users (email, name, password) \
        VALUES (?, ?, ?)";

    sql.connect(DBLogin, (err) => {

        if (err) console.log(err);
        // create Request object
        let request = new sql.Request();
    
        // query to the database and get the records (data)
        request.query(DBquery, [email,name,password], (err, resp) => {
    
          if (err) console.log(err);
          // console.log(resp);
    
          // send records as a response
          return(resp.recordset);
    
        });
    });
}

//export the db call functions
exports.DBgetAccount = DBgetAccount;
exports.DBcreateAccount = DBcreateAccount;