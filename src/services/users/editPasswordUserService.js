import bcrypt from 'bcrypt';

// Importamos los Utils
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los Models
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { updatePasswordUserModel } from '../../models/users/updatePasswordUserModel.js';

// Importamos el Service de edición de contraseña
export const editPasswordUserService = async (id, newPass) => {
    // Busca el usuario en la DDBB
    const user = await selectUserByIdModel(id);

    const { oldPassword, newPassword } = newPass;

    // Verifica si la contraseña actual es correcta
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw generateErrorUtils(
            400,
            'INVALID_OLD_PASSWORD',
            'Contraseña antigua no coincide'
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
