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

    // Buscar en archivos
    const [fileRows] = await pool.query(
        `SELECT id, name, size, uploadedAt, userId, 'file' AS type FROM files WHERE shareToken = ?`,
        [shareToken]
    );

    if (fileRows.length > 0) return fileRows[0];

    // Buscar en carpetas
    const [folderRows] = await pool.query(
        `SELECT id, name, createdAt, userId, 'folder' AS type FROM folders WHERE shareToken = ?`,
        [shareToken]
    );

    return folderRows.length > 0 ? folderRows[0] : null;
};
