// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const deleteAvatarUserModel = async (userId) => {
    // Obtiene la conexión con la DDBB
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE users SET avatar = NULL WHERE id = ?;`,
        [userId]
    );

    return result;
};
