const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const path = require("path");
const connection = require('./Model/dbConnect')
app.use(cors(
    {
     origin: ['http://localhost:3000'],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}
));
app.use("/images", express.static(path.join(__dirname, "images")));

const departmentRouter = require("./Routes/Department/departmentRoute");
app.use("/", departmentRouter);

const employeeRouter = require("./Routes/Employee/employeeRoute");
app.use("/", employeeRouter);

const port = 8000;
app.post("/api/myapi/", (req, res)=>{
    const { id, department_id, name, dob, phone, email, salary, status } = req.body;
    const filename = req.file?.filename;

    //  Ensure `department_id` is an integer
    console.log('Hello in index file')
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
})
app.listen(port, () => {
    console.log(`Server is ruuning on port ${port}`);
});
