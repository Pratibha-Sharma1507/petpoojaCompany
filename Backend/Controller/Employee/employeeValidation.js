const Joi = require("joi");

const employeeSchema = Joi.object({
    id: Joi.string().required(),
    department_id: Joi.string().required(),
    name: Joi.string().required(),
    dob: Joi.date().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
        .messages({ "string.pattern.base": "Phone number must be exactly 10 digits" }),
    email: Joi.string().email().required(),
    salary: Joi.number().min(0).precision(2).required(),
    status: Joi.string().valid("Active", "Inactive").required(),
    photo: Joi.any().optional(), // ✅ Allow optional photo upload
});

const validateSchema = (req, res, next) => {
    console.log("🔍 Backend Received Data: ", req.body);
    console.log("🔍 Received File: ", req.file); // ✅ Debugging

    // ✅ Include file in validation if exists
    const dataToValidate = req.file 
        ? { ...req.body, photo: req.file.filename } 
        : req.body; 

    const { error } = employeeSchema.validate(dataToValidate, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: "Validation Failed",
            details: error.details.map(err => err.message),
        });
    }

    next();
};

module.exports = { validateSchema };
