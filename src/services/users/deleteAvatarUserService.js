// Importamos los Utils
import { deleteAvatarUtil } from '../../utils/avatarUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los Models
import { deleteAvatarUserModel } from '../../models/users/deleteAvatarUserModel.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

// Service que borra el Avatar
export const deleteAvatarUserService = async (userId) => {
    // Busca  al usuario y su avatar actual
    const user = await selectUserByIdModel(userId);

    // verificar si el usuario existe
    if (!user) {
        throw generateErrorUtils(404, 'USER_NOT_FOUND', 'El usuario no existe');
    }

    // lanza un error si el usuario no tiene avatar
    if (!user.avatar) {
        throw generateErrorUtils(
            400,
            'USER_HAS_NOT_AVATAR',
            'El usuario no tiene avatar'
        );
    }

    // Elimina el avatar del sistema de archivos
    await deleteAvatarUtil(userId, user.avatar);

    // Borra el avatar de la DDBB
    const result = await deleteAvatarUserModel(userId);

    // Lanza un error si no se a podido borrar el avatar
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            'DELETE_AVATAR_ERROR',
            'El avatar no se pudo eliminar'
        );
    }

    return result;
};
