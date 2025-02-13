// Importamos los models
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { updateStatusModel } from '../../models/users/updateStatusModel.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Service que se encarga de des/activar usuarios
export const updateUserStatuService = async (id, active) => {
    // Verificar que el usuario existe
    const user = await selectUserByIdModel(id);
    if (!user) {
        throw generateErrorUtils(
            '404',
            'USER_NOT_FOUND',
            'Usuario no encontrado'
        );
    }

    // Actualizar el estado del usuario
    await updateStatusModel(id, active);

    // Devolvemos el usuario actualizado
    return { id, active };
};
