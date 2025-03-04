import { getPool } from '../../db/getpool.js';

export const assignShareToken = async (
    resourceId,
    resourceType,
    shareToken
) => {
    const pool = await getPool();
    const table = resourceType === 'file' ? 'files' : 'folders';

    const [result] = await pool.query(
        `UPDATE ${table} SET shareToken = ? WHERE id = ?`,
        [shareToken, resourceId]
    );
    return result.affectedRows === 1 ? true : false;
};

export const getResourceByShareToken = async (shareToken) => {
    const pool = await getPool();

    // Consulta optimizada con `UNION` para obtener archivos y carpetas en una sola consulta
    const [rows] = await pool.query(
        `
        SELECT id, name, size, shareToken, folderId, 'createdAt' AS uploadedAt, userId, 'file' AS type
        FROM files WHERE shareToken = ?
        UNION
        SELECT id, name, NULL AS size, shareToken, NULL AS folderId, createdAt, userId, 'folder' AS type
        FROM folders WHERE shareToken = ?;
    `,
        [shareToken, shareToken]
    );

    return rows.length > 0 ? rows[0] : null;
};

export const getFilesInFolderModel = async (folderId) => {
    const pool = await getPool();
    const [files] = await pool.query(
        `SELECT id, name, size, shareToken, uploadedAt FROM files WHERE folderId = ?`,
        [folderId]
    );
    return files;
};
