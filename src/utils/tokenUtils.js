import generateErrorUtils from './helpersUtils.js';
import jwt from 'jsonwebtoken';

export const checkExtractTokenUtils = () => {
    //Comprobar si el token contiene Bearer
    if (!authorization.startsWith('Bearer')) {
        throw generateErrorUtils(
            401,
            'INVALID_TOKEN_FORMAT',
            'El token debe empezar por Bearer'
        );
    }
    // Extraer el token
    const token = authorization.split(' ')[1];

    return token;
};

export const verifyTokenPayloadUtils = (token, secret) => {
    try {
        const payload = jwt.verify(token, secret);

        return payload;
    } catch (error) {
        throw generateErrorUtils(401, 'INVALID_TOKEN', 'Token inválido');
    }
};
