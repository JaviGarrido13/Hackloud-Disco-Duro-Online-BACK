import { getPool } from '../../db/getpool.js';

export const deleteAssessmentsModel = async (id) => {
    const pool = await getPool();
    const [result] = await pool.query(`DELETE FROM assessments WHERE id = ?`, [
        id,
    ]);
    return result.affectedRows > 0 ? true : false;
};
