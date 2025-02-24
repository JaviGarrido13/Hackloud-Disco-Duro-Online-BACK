// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newUserSchema = joi.object({
    firstName: joi
        .string()
        .min(3)
        .max(50)
        .allow(null, '')
        .messages(joiErrorMessages),
    lastName: joi
        .string()
        .min(3)
        .max(50)
        .allow(null, '')
        .messages(joiErrorMessages),
    birthday: joi.date().iso().required().messages(joiErrorMessages),
    username: joi.string().min(4).max(25).required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!@$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!@$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

export default newUserSchema;
