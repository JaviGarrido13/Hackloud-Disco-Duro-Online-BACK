import bcrypt from 'bcrypt';

// Importamos los Utils
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los Models
import { updatePasswordByRecoveryModel } from '../../models/users/updatePasswordByRecoveryModel.js';
import { selectUserByRecoveryPassModel } from '../../models/users/selectUserByRecoveryPassModel.js';

// Importamos el Service de recuperación de contraseña
export const editPasswordByRecoveryService = async (
    recoveryPassCode,
    newPassword
) => {
    // Busca el usuario por email
    const user = await selectUserByRecoveryPassModel(recoveryPassCode);

    // Comprueba que el recoveryPassCode del usuario encontrado sea igual al recoveryPassCode del body
    if (!user || user.recoveryPassCode !== recoveryPassCode) {
        throw generateErrorUtils(
            409,
            'INCORRECT_DATA',
            'Email o código de recuperación incorrectos'
        );
    }

    // Actualiza la contraseña del usuario
    const passwordHash = await bcrypt.hash(newPassword, 10);

    const resultPass = await updatePasswordByRecoveryModel(
        user.id,
        passwordHash
    );
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
