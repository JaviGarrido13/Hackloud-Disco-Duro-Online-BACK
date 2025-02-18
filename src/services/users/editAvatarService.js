import path from 'path';
import fs from 'fs';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const editAvatarService = async (userId, avatarFileName) => {
    // Obtenemos el usuario actual
    const user = await selectUserByIdModel(userId);
    if (!user) {
        throw generateErrorUtils(
            404,
            'USER_NOT_FOUND',
            'Usuario no encontrado'
        );
    }

    // Si el usuario ya tiene avatar, eliminar el anterior
    if (user.avatar) {
        const oldAvatarPath = path.join(
            process.cwd(),
            'uploads',
            userId,
            'avatars',
            user.avatar
        );
        if (fs.existsSync(oldAvatarPath)) {
            fs.unlink(oldAvatarPath);
        }
    }
    return await updateAvatarModel(userId, avatarFileName);
};
