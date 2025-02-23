import { getPool } from '../../db/getpool.js';

export const getAssessmentByIdModel = async (id) => {
    const pool = await getPool();
    const [assesment] = await pool.query(
        `SELECT * FROM assessments WHERE id = ?`,
        [id]
    );
    return assesment[0];
};
