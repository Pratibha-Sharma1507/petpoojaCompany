const mysql = require('mysql');
const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: 3306,
    password: "",
    database: "petpoojadb"
});
connection.connect(function(err){
    if(err){
        console.log("Error", err.sqlMessage);
    }
    else{
        console.log("connected");
    }
})
module.exports = connection;

