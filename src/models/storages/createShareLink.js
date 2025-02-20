import { getPool } from '../../db/getpool.js';

export const createShareLink = async (shareToken) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `SELECT resourceId, resourceType, ownerId, permission FROM shared_resources WHERE shareToken = ?`,
        [shareToken]
    );
    return rows.length > 0 ? rows[0] : null;
};
