import { getPool } from '../../db/getpool.js';

export const getAllAssessmentsModel = async () => {
    const pool = await getPool();
    const [result] = await pool.query(
        `SELECT id, userId, vote, comment, createdAt FROM assessments ORDER BY createdAt DESC`
    );
    return result;
};
