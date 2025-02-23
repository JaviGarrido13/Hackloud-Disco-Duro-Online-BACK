// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const selectUserByIdModel = async (id) => {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM users WHERE id = ?;`, [id]);

    // Email es único, asi que nos quedamos con la primera posición
    return user[0];
};
