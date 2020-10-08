const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number()
            .required(),
        name: Joi.string()
            .required(),
        age: Joi.number()
            .min(10)
            .max(100),
        gender: Joi.string()
            .valid('male', 'female'),
        password: [
            Joi.string()
            .min(6),
        ]
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation,
};