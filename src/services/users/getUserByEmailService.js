// Importamos el Utils de Errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos el Model
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';

// Importamos el Service para consseguir el usuario por email
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
