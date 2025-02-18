import joi from 'joi';
import joiErrorMessages from './joiErrorMessages.js';

// Esquema para validar imágenes.
// name: Es el nombre del archivo. Es una cadena y es requerido.
// mimetype: Es el tipo de archivo. Es una cadena, es requerido.
// size: Es el tamaño del archivo. Es un número, debe ser menor a 5 MB y es requerido.
// unknown(true): Permite que el objeto tenga campos adicionales que no vamos a validar.
export const imageSchema = joi
    .object({
        mimetype: joi
            .string()
            .valid(
                'image/jpeg',
                'image/png',
                'image/jpg',
                'image/gif',
                'image/webp',
                'image/svg'
            )
            .required()
            .messages(joiErrorMessages),
        size: joi
            .number()
            .max(5 * 1024 * 1024)
            .required()
            .messages(joiErrorMessages),
    })
    .unknown(true);
