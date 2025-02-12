import generateErrorUtils from '../utils/helpersUtils.js';
import {
    checkExtractTokenUtils,
    verifyTokenPayloadUtils,
} from '../utils/tokenUtils.js';

import { SECRET } from '../../env.js';

export const authUserMiddleware = (req, res, next) => {
    try {
        // Coge el token de los headers
        const { authorization } = req.headers;

        // Comprueba si hay token
        if (!authorization) {
            throw generateErrorUtils(
                401,
                'TOKEN_MISSING',
                'No se ha encontrado token en los headers'
            );
        }

        // Verifica si el token empieza por 'Bearer'
        const token = checkExtractTokenUtils(authorization);

        // Recupera el payload del token
        const payload = verifyTokenPayloadUtils(token, SECRET);
        next();
    } catch (error) {
        next(error);
    }
};
