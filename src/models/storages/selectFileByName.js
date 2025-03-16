// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const selectFileByName = async (fileName) => {
    const pool = await getPool();
    const [result] = await pool.query(`SELECT * FROM files WHERE name = ?`, [
        fileName,
    ]);
    return result[0];
};
