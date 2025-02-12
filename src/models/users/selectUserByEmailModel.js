import { getPool } from '../../db/getPool.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM users WHERE email = ?;`, [
        email,
    ]);

    return user[0];
};
