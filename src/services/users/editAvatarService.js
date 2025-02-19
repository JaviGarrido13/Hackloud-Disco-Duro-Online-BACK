import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { updateAvatarModel } from '../../models/users/updateAvatarModel.js';
import { deleteAvatarUtil, saveAvatarUtil } from '../../utils/avatarUtils.js';

export const editAvatarService = async (userId, newAvatar, fileBuffer) => {
    // Obtenemos el usuario actual
    const user = await selectUserByIdModel(userId);

    // Eliminar el avatar anterior
    await deleteAvatarUtil(userId, user?.avatar);

    // Guardar el nuevo avatar
    await saveAvatarUtil(userId, fileBuffer);

    return await updateAvatarModel(userId, newAvatar);
};
