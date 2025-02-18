import path from 'path';

import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { deletePhotoUtil, savePhotoUtil } from '../../utils/photoUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';
import { updateAvatarUserModel } from '../../models/users/updateAvatarUserModel.js';

export const editAvatarService = async (id, avatar) => {
    // Buscamos el usuario en la Base de datos
    const user = await selectUserByIdModel(id);

    const userAvatarPath = `uploads/avatars/${id}`;

    // Procesar y guardar la imagen
    const newAvatarFileName = await savePhotoUtil(userAvatarPath, avatar, 200);

    //Borramos el avatar anterior si el usuario ya tenia uno
    if (user.avatar) {
        const oldAvatarPath = path.join(
            process.cwd(),
            userAvatarPath,
            user.avatar
        );
        await deletePhotoUtil(oldAvatarPath);
    }

    // Actualizar la base de datos con el nuevo avatar
    const result = await updateAvatarUserModel(id, newAvatarFileName);
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            'UPDATE_AVATAR_ERROR',
            'El avatar no se a podido actualizar'
        );
    }

    // Eliminar password del usuario
    delete user.password;

    // Devolver el usuario actualizado
    return { ...user, avatar: newAvatarFileName };
};
