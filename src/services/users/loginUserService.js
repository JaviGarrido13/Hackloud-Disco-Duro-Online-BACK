// Importamos las dependencias
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos el model
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';

// Import el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos variables de entorno
import { SECRET } from '../../../env.js';

// Service que se encarga de logger un usuario
export const loginUserService = async (email, password) => {
    // Busca el usuario por email
    const user = await selectUserByEmailModel(email);
    // Si no existe el usuario, lanzamos un error
    if (!user) {
        throw generateErrorUtils(
            404,
            'LOGIN_FAILED',
            'El email no esta registrado'
        );
    }

    // Comprueba si la contraseña es correcta
    let isValidPassword = false;
    if (user) {
        isValidPassword = await bcrypt.compare(password, user.password);
    }

    // Lanza un error si no hay usuario o la contraseña no es correcta
    if (!user || !isValidPassword) {
        throw generateErrorUtils(
            401,
            'LOGIN_FAILED',
            'El Email o contraseña es incorrecto'
        );
    }

    // Lanza un error si el usuario no está activado
    if (!user.active) {
        throw generateErrorUtils(401, 'LOGIN_FAILED', 'Usuario no activo');
    }

    // Genera el token
    const payload = {
        id: user.id,
        role: user.role,
    };

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '2h',
    });

    // Devuelve el token
    return token;
};
