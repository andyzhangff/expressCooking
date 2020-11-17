const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .required()
            .max(100)
            .min(2),
        email: Joi.string()
            .email(),
        password: [
            Joi.string()
            .min(6),
        ]
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .required()
            .max(100)
            .min(2),
        password: [
            Joi.string()
            .max(255)
            .min(6),
        ]
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
};