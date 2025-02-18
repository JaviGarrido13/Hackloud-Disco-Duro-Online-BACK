import { getPool } from '../../db/getpool.js';

export const updateAvatarModel = async (userId, newAvatarFileName) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE users SET avatar = ? WHERE id = ?`,
        [newAvatarFileName, userId]
    );

    return result.affectedRows > 0
        ? { id: userId, avatar: newAvatarFileName }
        : null;
};
