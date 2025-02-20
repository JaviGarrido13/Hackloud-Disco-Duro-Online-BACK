import { getPool } from '../../db/getpool.js';

export const getFilesInFolderModel = async (folderId) => {
    const pool = await getPool();
    const [files] = await pool.query(
        `SELECT id, name, size, uploadedAt FROM files WHERE folderId = ?`,
        [folderId]
    );
    return files;
};
