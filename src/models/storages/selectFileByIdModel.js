// Importamos función que devuelve pool con la ddbb
import { getPool } from '../../db/getpool.js';

// Model que devuelve un items por su id
export const selectFileByIdModel = async (id) => {
    const pool = await getPool();
    const [result] = await pool.query(`SELECT * FROM files WHERE id = ?`, [id]);
    return result[0];
};
