import { getPool } from '../../db/getpool.js';

export const shareFileOrFolderModel = async (
    resourceId,
    resourceType,
    ownerId,
    permission,
    token
) => {
    const pool = await getPool();
    const id = crypto.randomUUID();

    await pool.query(
        `INSERT INTO shared_resources (id, resourceId, resourceType, ownerId, permission, shareToken)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, resourceId, resourceType, ownerId, permission, token]
    );

    return token;
};

export const isResourceSharedWithUser = async (resourceId, userId) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `SELECT permission FROM shared_resources WHERE resourceId = ? AND sharedWithId = ?`,
        [resourceId, userId]
    );
    return rows.length > 0 ? rows[0].permission : null;
};

export const getResourceByShareTokenModel = async (shareToken) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `SELECT * FROM shared_resources WHERE shareToken = ?`,
        [shareToken]
    );
    return rows.length > 0 ? rows[0] : null;
};

export const getResourceModel = async (resourceId) => {
    const pool = await getPool();
    const [rows] = await pool.query(
        `SELECT * FROM shared_resources WHERE resourceId = ?`,
        [resourceId]
    );
    return rows.length > 0 ? rows[0] : null;
};
