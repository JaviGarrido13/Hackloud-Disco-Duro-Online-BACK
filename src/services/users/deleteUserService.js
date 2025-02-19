//Importamos los models
import { deleteUserModel } from '../../models/users/deleteUserModel.js';
import { deleteFolderUtil } from '../../utils/foldersUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

//Servicio para elimnar el usuario y sus datos asociados

export const deleteUserService = async (id) => {
    //Eliminar el usuario de la base de datos
    const deleted = await deleteUserModel(id);
    if (!deleted) {
        throw generateErrorUtils(
            500,
            'USER_NOT_DELETED',
            'El usuario no ha sido eliminado de la DDBB'
        );
    }

    //Eliminar la carpeta de usuario
    await deleteFolderUtil(id);

    //Mensaje de exito
    return { id, message: 'Usuario eliminado con exito' };
};
