// Importamos los Utils
import { deleteAvatarUtil } from '../../utils/avatarUtils.js';

// Importamos los Models
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { updateAvatarModel } from '../../models/users/updateAvatarModel.js';

// Importamos el Service para Editar el Avatar
export const editAvatarService = async (userId, newAvatar, fileBuffer) => {
    // Obtenemos el usuario actual
    const user = await selectUserByIdModel(userId);

    // Eliminar el avatar anterior
    await deleteAvatarUtil(userId, user?.avatar);

    return await updateAvatarModel(userId, newAvatar);
};
