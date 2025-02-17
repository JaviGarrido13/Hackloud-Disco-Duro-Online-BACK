import { getPool } from '../../db/getpool.js';

export const selectFolderByName = async (folderName) => {
    const pool = await getPool();
    const [result] = await pool.query(`SELECT * FROM folders WHERE name = ?`, [
        folderName,
    ]);
    return result[0];
};
