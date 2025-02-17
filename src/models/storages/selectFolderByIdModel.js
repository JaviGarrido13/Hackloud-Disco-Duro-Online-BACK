// Importamos función que devuelve pool con la ddbb
import { getPool } from '../../db/getpool.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Model que devuelve un items por su id
export const selectFolderByIdModel = async (id) => {
    const pool = await getPool();
    const result = await pool.query(`SELECT * FROM folders WHERE id = ?`, [id]);
    return result.length > 0 ? result[0] : null;
};
