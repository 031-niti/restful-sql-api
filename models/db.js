//ดึงตัวเสริม
const mysql = require('mysql');

//ดึงไฟล์มา
const dbconfig = require("../config/db.config");

//สร้าง connection database ดึงจาก dbconfig
const connection = mysql.createConnection({
    host : dbconfig.HOST,
    user : dbconfig.USER,
    password : dbconfig.PASSWORD,
    database : dbconfig.DB
});

//Open Mysql Connect
connection.connect(
    (error) => {
        if (error) throw error; 
        console.log("successfully connection to the database...");
        
    }
);

module.exports = connection;