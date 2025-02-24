import { getPool } from '../../db/getpool.js';

export const assessmentsAverageModel = async () => {
    const pool = await getPool();

    const [[{ media }]] = await pool.query(
        `SELECT ROUND(AVG(vote), 1) AS media FROM assessments`
    );

    return media || 0; // Si no hay votos, devuelve 0
};
