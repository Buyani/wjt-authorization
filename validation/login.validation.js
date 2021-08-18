const Joi=require('@hapi/joi');

const login_schema=Joi.object(
    {
        email:Joi.string().required().email().min(6),
        password:Joi.string().required().min(6)
    }

)

module.exports=login_schema;