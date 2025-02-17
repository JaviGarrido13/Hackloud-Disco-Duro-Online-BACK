import { getPool } from '../../db/getpool.js';

export const createNewFolderModel = async (foldersId, folderName, userId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO folders (id, name, userId)
        VALUES (?, ?, ?)
        `,
        [foldersId, folderName, userId]
    );

    return result;
};
