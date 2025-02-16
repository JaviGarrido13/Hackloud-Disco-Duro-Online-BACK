import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

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
