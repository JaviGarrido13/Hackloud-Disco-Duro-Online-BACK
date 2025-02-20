// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const listFilesAndFoldersModel = async (userId, folderId = null) => {
    try {
        const pool = await getPool();

        // Obtener archivos y carpetas dentro de la carpeta raíz o dentro de una carpeta específica
        const [items] = await pool.query(
            `SELECT id, name, 'folder' AS type FROM folders WHERE userId = ? AND (id = ? OR ? IS NULL)
            UNION
            SELECT id, name, 'file' AS type FROM files WHERE userId = ? AND (folderId = ? OR ? IS NULL)`,
            [userId, folderId, folderId, userId, folderId, folderId]
        );

        return items;
    } catch (error) {
        throw generateErrorUtils(
            500,
            'DB_ERROR',
            'No se pudo obtener la lista de archivos y carpetas.'
        );
    }
};
