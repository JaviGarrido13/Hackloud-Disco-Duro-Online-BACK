// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const selectUserByUsernameModel = async (username) => {
    const pool = await getPool();

    // Query a la BD para buscar por userName
    const [user] = await pool.query(
        `SELECT id, username, firstName, lastName, email FROM users WHERE username = ?;`,
        [username]
    );

    return user[0];
};
