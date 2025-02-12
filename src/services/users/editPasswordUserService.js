import bcrypt from 'bcrypt';

import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { updatePasswordUserModel } from '../../models/users/updatePasswordUserModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const editPasswordUserService = async (
    id,
    oldPassword,
    newPassword,
    confirmNewPassword
) => {
    // Busca el usuario en la DDBB
    const user = await selectUserByIdModel(id);

    // Verifica si la contraseña actual es correcta
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw generateErrorUtils(
            400,
            'INVALID_PASSWORD',
            'Contraseña incorrecta'
        );
    }

    // Verifica que la contraseña nueva y la confirmación sean iguales
    if (newPassword !== confirmNewPassword) {
        throw generateErrorUtils(
            400,
            'PASSWORDS_DO_NOT_MATCH',
            'Las contraseñas no coinciden'
        );
    }

    // Encripta la nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Actualiza la contraseña en la DDBB
    const result = await updatePasswordUserModel(id, newPasswordHash);
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            'ERROR_UPDATING_PASSWORD',
            'Error al actualizar la contraseña'
        );
    }

    // Borra la propiedad password del usuario
    delete user.password;
    // Devuelve el usuario actualizado
    return user;
};
