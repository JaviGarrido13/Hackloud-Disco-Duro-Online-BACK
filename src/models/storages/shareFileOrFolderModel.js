import { getPool } from '../../db/getpool.js';

export const assignShareToken = async (
    resourceId,
    resourceType,
    shareToken
) => {
    const pool = await getPool();
    const table = resourceType === 'file' ? 'files' : 'folders';

    await pool.query(`UPDATE ${table} SET shareToken = ? WHERE id = ?`, [
        shareToken,
        resourceId,
    ]);
};

export const getResourceByShareToken = async (shareToken) => {
    const pool = await getPool();

    // Consulta optimizada con `UNION` para obtener archivos y carpetas en una sola consulta
    const [rows] = await pool.query(
        `
        SELECT id, name, size, uploadedAt AS createdAt, userId, 'file' AS type
        FROM files WHERE shareToken = ?
        UNION
        SELECT id, name, NULL AS size, createdAt, userId, 'folder' AS type
        FROM folders WHERE shareToken = ?;
    `,
        [shareToken, shareToken]
    );

    return rows.length > 0 ? rows[0] : null;
};

export const getFilesInFolderModel = async (folderId) => {
    const pool = await getPool();
    const [files] = await pool.query(
        `SELECT id, name, size, uploadedAt FROM files WHERE folderId = ?`,
        [folderId]
    );
    return files;
};
