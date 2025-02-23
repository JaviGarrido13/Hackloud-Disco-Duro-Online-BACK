// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

import generateErrorUtils from '../../utils/helpersUtils.js';

export const deleteFolderByIdModel = async (folderId, userId) => {
    const pool = await getPool();

    // Borrar archivos del folder
    await pool.query('DELETE FROM files WHERE folderId = ?', [folderId]);

    const [result] = await pool.query(
        `
        DELETE FROM folders
        WHERE id = ?
        `,
        [folderId]
    );

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'DELETE_FOLDER_FAILED',
            'No se pudo eliminar la carpeta'
        );
    }

    return result;
};
