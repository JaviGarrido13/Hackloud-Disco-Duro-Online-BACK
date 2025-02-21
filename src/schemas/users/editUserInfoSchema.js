import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserInfoSchema = joi.object({
    username: joi.string().min(3).max(25).required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    firstName: joi
        .string()
        .min(3)
        .max(40)
        .optional()
        .messages(joiErrorMessages),
    lastName: joi.string().min(3).max(40).optional().messages(joiErrorMessages),
});

export default editUserInfoSchema;
