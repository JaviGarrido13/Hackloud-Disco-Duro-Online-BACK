//Importamos los models
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { deleteUserModel } from '../../models/users/deleteUserModel.js';
import { deleteUserFilesModel } from '../../models/users/deleteUserFilesModel';

//Importamos los errores
import generateErrorUtils from '../../utils/helpersUtils.js';

//Servicio para elimnar el usuario y sus datos asociados

export const deleteUserService = async (id) => {
    //Verificamos si el usuario existe
    const user = await selectUserByIdModel(id);
    if (!user) {
        throw generateErrorUtils(404, 'USER_NOT_FOUND', 'El usuario no exite');
    }

    //Eliminar los archivos asociados al usuario
    await deleteUserFilesModel(id);

    //Eliminar el usuario de la base de datos
    const result = await deleteUserModel;
    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'CONFLICT',
            'No se pudo eliminar el usuario'
        );
    }

    //Mensaje de exito
    return { id, message: 'Usuario eliminado con exito' };
};
