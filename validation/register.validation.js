const Joi=require('@hapi/joi')

const registervalidation=Joi.object(
    {
        name:Joi.string()
        .required().min(6),
        email:Joi.string()
        .required()
        .max(50)
        .email(),
        password:Joi.string()
        .required()
        .min(6)
    }
)

module.exports=registervalidation;