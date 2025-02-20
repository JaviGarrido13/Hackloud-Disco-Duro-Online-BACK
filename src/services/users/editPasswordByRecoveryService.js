import bcrypt from 'bcrypt';

// Importamos los Utils
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los Models
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { updatePasswordByRecoveryModel } from '../../models/users/updatePasswordByRecoveryModel.js';

// Importamos el Service de recuperación de contraseña
export const editPasswordByRecoveryService = async (
    email,
    recoveryPassCode,
    newPassword,
    newPasswordConfirm
) => {
    // Busca el usuario por email
    const user = await selectUserByEmailModel(email);

    // Comprueba que el recoveryPassCode del usuario encontrado sea igual al recoveryPassCode del body
    if (!user || user.recoveryPassCode !== recoveryPassCode) {
        throw generateErrorUtils(
            409,
            'INCORRECT_DATA',
            'Email o código de recuperación incorrectos'
        );
    }

    // Comprueba que newPassword y newPasswordConfirm son iguales
    if (newPassword !== newPasswordConfirm) {
        throw generateErrorUtils(
            409,
            'INCORRECT_PASSWORD',
            'Las contraseñas no coinciden'
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
