import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

export const renameSchema = joi.object({
    name: joi.string().min(3).max(255).required().messages(joiErrorMessages),
    type: joi
        .string()
        .valid('file', 'folder')
        .required()
        .messages(joiErrorMessages),
});
