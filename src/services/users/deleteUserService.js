// Importamos los Utils
import { deleteFolderUtil } from '../../utils/foldersUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

//Importamos los models
import { deleteUserModel } from '../../models/users/deleteUserModel.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

//Servicio para elimnar el usuario y sus datos asociados
export const deleteUserService = async (id) => {
    // Verificar que el usuario exista
    const user = await selectUserByIdModel(id);
    if (!user) {
        throw generateErrorUtils(
            409,
            'USER_NOT_FOUND',
            'El usuario que intenta eliminar no existe'
        );
    }

    //Eliminar el usuario de la base de datos
    if (user.active === true || user.active === 1) {
        const deleted = await deleteUserModel(id);
        if (!deleted) {
            throw generateErrorUtils(
                500,
                'USER_NOT_DELETED',
                'El usuario no ha sido eliminado de la DDBB'
            );
        }
        await deleteFolderUtil(id);
    } else {
        await deleteUserModel(id);
    }

    //Mensaje de exito
    return { id, message: 'Usuario eliminado con exito' };
};
