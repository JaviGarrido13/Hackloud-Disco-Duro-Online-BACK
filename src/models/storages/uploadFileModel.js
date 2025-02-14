import { getPool } from '../../db/getpool.js';

export const uploadFileModel = async ({
    fileId,
    filename,
    size,
    userId,
    folderName,
}) => {
    const pool = await getPool();

    const result = await pool.query(
        'INSERT INTO files (id, name, size, userId, folderId) VALUES (?,?,?,?,?)',
        [fileId, filename, size, userId, folderId]
    );
    return result.affectedRows > 0
        ? { id: result.insertId, filename, size, userId }
        : NULL;
};
