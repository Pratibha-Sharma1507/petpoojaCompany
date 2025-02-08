const Joi = require("joi");
const departmentSchema = Joi.object({
   id : Joi.string().required(),
   name: Joi.string().required(),
   status: Joi.string().required()
})
const validateSchema = (req, res, next) => {
    const {error} = departmentSchema.validate(req.body);
    if(error){
        return res.send("Invalid Req");
    }
     next();         
}
module.exports = {validateSchema};



