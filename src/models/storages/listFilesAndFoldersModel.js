// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const listFilesAndFoldersModel = async (userId) => {
    const pool = await getPool();

    // Obtener carpetas del usuario
    const [folders] = await pool.query(
        `
        SELECT id, name, userId, shareToken, createdAt, 'folder' AS type FROM folders WHERE userId = ?`,
        [userId]
    );

    // Obtener archivos del usuario
    const [files] = await pool.query(
        `
        SELECT id, name, size, userId, folderId, shareToken, uploadedAt, 'file' AS type FROM files WHERE userId = ?`,
        [userId]
    );
    return [...folders, ...files];
};
