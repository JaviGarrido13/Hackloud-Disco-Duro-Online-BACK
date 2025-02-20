// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const deleteFolderByIdModel = async (idList) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        DELETE FROM folders
        WHERE id IN (?)
        `[idList]
    );

    return result;
};
