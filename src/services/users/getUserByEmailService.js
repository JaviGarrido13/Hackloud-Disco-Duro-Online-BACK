import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getUserByEmailService = async (email) => {
    // El model busca el usuario por email, si no existe devolverá un error.
    const user = await selectUserByEmailModel(email);
    if (!user) {
        throw generateErrorUtils(
            404,
            'NO_USER_FOUND',
            'No se ha encontrado el usuario'
        );
    }

    return user;
};
