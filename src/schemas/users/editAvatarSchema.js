import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';
import { imageSchema } from '../imageSchema.js';

export const editAvatarSchema = joi.object({
    avatar: imageSchema.required().messages(joiErrorMessages),
});
