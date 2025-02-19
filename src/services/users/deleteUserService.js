//Importamos los models
import { deleteUserModel } from '../../models/users/deleteUserModel.js';

//Servicio para elimnar el usuario y sus datos asociados

export const deleteUserService = async (id) => {
    //Eliminar el usuario de la base de datos
    const deleted = await deleteUserModel(id);

    //Eliminar la carpeta de usuario
    await deleteFolderUtil(id);

    //Mensaje de exito
    return { id, message: 'Usuario eliminado con exito' };
};
