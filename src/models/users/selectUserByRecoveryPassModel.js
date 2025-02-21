import { getPool } from '../../db/getpool.js';

export const selectUserByRecoveryPassModel = async (recoveryPassCode) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `SELECT id, recoveryPassCode FROM users WHERE recoveryPassCode = ?`,
        [recoveryPassCode]
    );

    return user[0];
};
