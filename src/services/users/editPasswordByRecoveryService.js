import bcrypt from 'bcrypt';

// Importamos los Utils
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los Models
import { selectUserByRecoveryPassModel } from '../../models/users/selectUserByRecoveryPassModel.js';
import { updatePasswordUserModel } from '../../models/users/updatePasswordUserModel.js';

// Importamos el Service de recuperación de contraseña
export const editPasswordByRecoveryService = async (
    recoveryPassCode,
    newPassword
) => {
    // Busca el usuario por recoveryPassCode
    const user = await selectUserByRecoveryPassModel(recoveryPassCode);

    // Si no hay usuario con ese recoveryPassCode lanzamos error
    if (!user) {
        throw generateErrorUtils(
            404,
            'NO_USERS_WITH_RECPASSCODE',
            'No hay usuarios con el recoveryPassCode proporcionado'
        );
    }

    // Actualiza la contraseña del usuario
    const passwordHash = await bcrypt.hash(newPassword, 10);

    const resultPass = await updatePasswordUserModel(user.id, passwordHash);
    if (resultPass.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            'UPDATE_ERROR',
            'Error al actualizar la contraseña'
        );
    }

    // Devuelve el resultado
    delete user.recoveryPassCode;
    delete user.password;

    return user;
};
