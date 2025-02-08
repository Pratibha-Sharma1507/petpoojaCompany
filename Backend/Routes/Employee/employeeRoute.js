const express = require("express");
const employeeRouter = express.Router();
const multer = require("multer");
const {postEmployee, getEmployee, updateEmployee, deleteEmployee, highestSalary, salaryRangeWise,youngestEmployee
 } = require("../../Controller/Employee/employeeController")
const {validateSchema} = require("../../Controller/Employee/employeeValidation")

 const config = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null, "./images")
    },
    filename: function(req, file, cb){
        cb(null, `photo-${Date.now()}.${file.originalname}`)
    }
})
const upload = multer({
    storage: config
})


employeeRouter.post('/addemployee', upload.single("photo"), validateSchema,postEmployee);
employeeRouter.get('/viewemployee', getEmployee);
employeeRouter.put('/editemployee/:id', upload.single("photo"), validateSchema, updateEmployee);
employeeRouter.delete('/deleteemployee/:id',deleteEmployee);
employeeRouter.get('/highestsalary', highestSalary);
employeeRouter.get('/salaryrangewise', salaryRangeWise);
employeeRouter.get('/yougestemployee', youngestEmployee);

module.exports = employeeRouter;