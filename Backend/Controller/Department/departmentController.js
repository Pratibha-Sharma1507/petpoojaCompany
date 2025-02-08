const connection = require('../../Model/dbConnect');


const postDepartment =  (req, res) => {
    const { id, name, status } = req.body;
    const data = {
        id,
        name,
        status
    }
    let query = "INSERT INTO department SET ?";
 connection.query(query, data, function(error, result){
        if(error){
            console.log("Error..", error.sqlMessage);
        }
        else{
            res.send(result);
        }
    })

};

const getDepartment = (req, res) => {
        let userData = req.body;
        let sqlQuery = 'SELECT * FROM department'; 
         connection.query(sqlQuery, [userData], function (error, result, field) {
            if (error) {
                console.log("Error:", error.sqlMessage);
            }
            else {
                res.json(result);
            }

        });
}


const getNameDepartment = (req, res) => {
    let userData = req.body;
    let sqlQuery = 'SELECT id, name FROM department'; 
     connection.query(sqlQuery, [userData], function (error, result, field) {
        if (error) {
            console.log("Error:", error.sqlMessage);
        }
        else {
            res.json(result);
        }

    });
}
module.exports = { postDepartment, getDepartment, getNameDepartment};