//Importamos funciones necesarias
import { getPool } from '../../db/getpool.js';
import { listFilesAndFoldersModel } from '../../models/storages/listFilesAndFoldersModel.js';

//Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

//Services que se encarga de listar los archivos y carpetas.
export const listFilesAndFoldersService = async (userId, folderId = null) => {
    try {
        const pool = await getPool();
        if (folderId) {
            const [folder] = await pool.query(
                'SELECT id FROM folders WHERE id = ? AND userId = ?',
                [folderId, userId]
            );
            if (folder.length === 0) {
                throw generateErrorUtils(
                    404,
                    'Folder_NOT_FOUND',
                    'La carpeta especificada no existe'
                );
            }
        }

        const items = await listFilesAndFoldersModel(userId, folderId);

        return items;
    } catch (error) {
        throw generateErrorUtils(500, 'SERVER_ERROR', error.message);
    }
};
