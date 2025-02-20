// Importamos el Utils de Errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos el Model para seleccionar usuario por su id
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

// Importamos el Service para conseguir la informacion propia de usuario
export const ownUserService = async (id) => {
    //Comprobar si existe usuario
    const user = await selectUserByIdModel(id);

    //Si usuario no existe lanza error
    if (!user) {
        throw generateErrorUtils(404, 'USER_NOT_FOUND', 'El usuario no existe');
    }

    //Eliminar password del usuario
    delete user.password;

    return user;
};
