import { getPool } from '../../db/getpool.js';

export const selectUserByUsernameModel = async (username) => {
    const pool = await getPool();

    // Query a la BD para buscar por userName
    const [user] = await pool.query(`SELECT * FROM users WHERE username = ?;`, [
        username,
    ]);

    return user[0];
};
