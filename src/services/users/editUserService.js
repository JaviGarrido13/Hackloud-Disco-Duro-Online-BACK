// Importamos el Utils de Errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los Models
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { selectUserByUsernameModel } from '../../models/users/selectUserByUsernameModel.js';
import { updateUserModel } from '../../models/users/updateUserModel.js';

// Importamos el Service de edición de usuario
export const editUserService = async (id, newUserData) => {
    // Nos aseguramos de evitar valores undefined
    const cleanUserData = {
        username: newUserData.username,
        firstName: newUserData.firstName ? newUserData.firstName : null,
        lastName: newUserData.lastName ? newUserData.lastName : null,
        email: newUserData.email,
    };

    // Verificar si el username ya esta en uso por otro usuario
    const userByUsername = await selectUserByUsernameModel(
        cleanUserData.username
    );
    if (userByUsername && userByUsername.id !== id) {
        throw generateErrorUtils(
            400,
            'USERNAME_ALREADY_EXISTS',
            'El nombre de usuario ya esta en uso'
        );
    }

    // Verificar si el email ya esta en uso por otro usuario
    const userByEmail = await selectUserByEmailModel(cleanUserData.email);
    if (userByEmail && userByEmail.id !== id) {
        throw generateErrorUtils(
            400,
            'EMAIL_ALREADY_EXISTS',
            'El email ya esta en uso'
        );
    }
    // Llamar al model que actualiza los datos
    const result = await updateUserModel(id, cleanUserData);

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'USER_NOT_UPDATED',
            'Error al intentar actualizar los datos del usuario'
        );
    }

    return { id, ...cleanUserData };
};
