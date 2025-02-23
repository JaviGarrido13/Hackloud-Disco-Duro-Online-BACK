// Importamos el Service
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { updateAvatarModel } from '../../models/users/updateAvatarModel.js';
import { deleteAvatarUtil, saveAvatarUtil } from '../../utils/avatarUtils.js';

export const editAvatarUserController = async (req, res, next) => {
    try {
        // Recogemos el avatar
        const avatar = req.avatar;

        // Verificar si el user tiene avatar
        const user = await selectUserByIdModel(avatar.userId);

        let updatedAvatar;
        if (user.avatar === 'null') {
            // Si no tiene avatar, lo guardamos
            const avatarFileName = await saveAvatarUtil(user.id, avatar.buffer);
            updatedAvatar = await updateAvatarModel(user.id, avatarFileName);
        } else {
            // Si tiene avatar, lo eliminamos
            await deleteAvatarUtil(user.id);
            // Y lo guardamos
            const avatarFileName = await saveAvatarUtil(user.id, avatar.buffer);
            updatedAvatar = await updateAvatarModel(user.id, avatarFileName);
        }

        res.status(201).send({
            status: 'ok',
            updatedAvatar,
        });
    } catch (error) {
        next(error);
    }
};
