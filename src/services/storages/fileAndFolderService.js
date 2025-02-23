//Importamos el modelo.
import { listFilesAndFoldersModel } from '../../models/storages/listFilesAndFoldersModel.js';

//Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

export const listFilesAndFoldersService = async (userId) => {
    const data = await listFilesAndFoldersModel(userId);
    if (!data) {
        throw generateErrorUtils(
            500,
            'DB_ERROR',
            'No se pudo obtener la lista de archivos y carpetas.'
        );
    }
    return data;
};
