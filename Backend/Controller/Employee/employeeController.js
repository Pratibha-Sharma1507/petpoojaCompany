const connection = require("../../Model/dbConnect");

const getEmployee = (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Current Page
    const limit = 5;  // Employees per page
    const offset = (page - 1) * limit;  // Offset calculation

    //  Query to fetch paginated employees with department name
    const sql = `
        SELECT e.id, e.department_id, e.name, e.dob, e.phone, e.photo, e.email, e.salary, e.status, d.name AS department_name
        FROM Employee e
        JOIN Department d ON e.department_id = d.id
        LIMIT ?, ?;
    `;

    //  Query to count total employees
    const countSql = `SELECT COUNT(*) AS total FROM Employee`;

    connection.query(sql, [offset, limit], (err, result) => {
        if (err) {
            console.log(" Error:", err.sqlMessage);
            return res.status(500).send({ error: err.sqlMessage });
        }

        //  Fetch total employee count for pagination
        connection.query(countSql, (countErr, countResult) => {
            if (countErr) {
                console.log("Error:", countErr.sqlMessage);
                return res.status(500).send({ error: countErr.sqlMessage });
            }

            const totalEmployees = countResult[0].total;
            const totalPages = Math.ceil(totalEmployees / limit);  // Calculate total pages

            res.send({
                employees: result,
                totalEmployees,
                totalPages,
                currentPage: page
            });
        });
    });
};

const postEmployee = (req, res) => {
    const { id, department_id, name, dob, phone, email, salary, status } = req.body;
    const filename = req.file?.filename;

    //  Ensure `department_id` is an integer
    console.log('Hello')
    const data = {
        id,
        department_id,
        name,
        dob,
        phone,
        photo: filename,
        email,
        salary,
        status
    };
    console.log(data)
    let query = "INSERT INTO employee SET ?";
    connection.query(query, [data], function (error, result) {
        if (error) {
            console.log("Error:", error.sqlMessage);
            return res.status(500).json({ error: error.sqlMessage });
        } else {
            console.log("Employee Added:", result);
            return res.status(201).json({ message: "Employee added successfully", result });
        }
    });
};




const updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, dob, phone, email, salary, status } = req.body;
    const filename = req.file?.filename || req.body.photo;

    const data = {
        name,
        dob,
        phone,
        photo: filename,
        email,
        salary,
        status
    };

    let query = "UPDATE employee SET ? WHERE id = ?";
    connection.query(query, [data, id], function (error, result) {
        if (error) {
            console.log("Error..", error.sqlMessage);
            return res.status(500).json({ error: error.sqlMessage });
        }
        res.json({ message: "Employee updated successfully", result });
    });
};

const deleteEmployee = (req, res) => {

    let userData = req.params.id;
    let sqlQuery = "DELETE FROM employee WHERE id=?";

    connection.query(sqlQuery, userData, function (error, result, field) {
        if (error) {
            console.log("Error:", error.sqlMessage);
        }
        else {
            res.json(result);
        }
    });

}

// Department wise highest salary of employees 

const highestSalary = (req, res) => {
    const sql = `SELECT d.name AS department_name, MAX(e.salary) AS Highest_Salary FROM Employee e JOIN Department d ON e.department_id = d.id GROUP BY d.name`;
    connection.query(sql, (err, result) => {

        if (err) {
            console.log("Error", err.sqlMessage)
        }
        else {
            res.send(result);
        }
    });
}


// API to Get Salary Range Wise Employee Count

const salaryRangeWise = (req, res) => {
    const sql = `SELECT COUNT(CASE WHEN salary BETWEEN 0 AND 50000 THEN 1 END) AS '0-50000',
        COUNT(CASE WHEN salary BETWEEN 50001 AND 100000 THEN 1 END) AS '50001-100000',
        COUNT(CASE WHEN salary > 100000 THEN 1 END) AS '100000+'
        FROM Employee;
`;
    connection.query(sql, (err, result) => {

        if (err) {
            console.log("Error", err.sqlMessage)
        }
        else {
            res.send(result);
        }
    });
}

//API to get Youngest employee in each department 

const youngestEmployee = (req, res) => {
    const sql = `SELECT 
              d.name AS department_name, 
            e.name AS employee_name, 
           TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) AS age
          FROM Employee e
          JOIN 
          Department d ON e.department_id = d.id
           WHERE 
          e.dob = (
        SELECT MAX(dob) 
        FROM Employee 
        WHERE department_id = e.department_id
        );
   `;
    connection.query(sql, (err, result) => {

        if (err) {
            console.log("Error", err.sqlMessage)
        }
        else {
            res.send(result);
        }
    });
}

module.exports = { postEmployee, getEmployee, updateEmployee, deleteEmployee, highestSalary, salaryRangeWise, youngestEmployee }