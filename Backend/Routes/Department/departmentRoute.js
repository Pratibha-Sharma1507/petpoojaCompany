const express = require("express");
const departmentRouter = express.Router();
// const multer = require('multer');
const {postDepartment, getDepartment, getNameDepartment} = require("../../Controller/Department/departmentController")
const {validateSchema} = require("../../Controller/Department/departmentValidation")
departmentRouter.post('/adddepartment', validateSchema, postDepartment);
departmentRouter.get('/viewdepartment', getDepartment);
departmentRouter.get('/viewnamedepartment', getNameDepartment);

module.exports = departmentRouter;