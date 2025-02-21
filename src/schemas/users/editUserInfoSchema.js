import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserInfoSchema = joi.object({
    username: joi.string().min(3).max(25).required().message(joiErrorMessages),
    email: joi.string().email().required().message(joiErrorMessages),
    firstName: joi.string().min(3).max(40).optional().message(joiErrorMessages),
    lastName: joi.string().min(3).max(40).optional().message(joiErrorMessages),
});

export default editUserInfoSchema;
