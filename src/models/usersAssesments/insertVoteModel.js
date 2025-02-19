import { getPool } from "../../db/getpool.js"

export const insertVoteModel = async (id, userId, vote, comment) => {

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO assessments (id, userId, vote, comment) VALUES (?, ?, ?, ?)
        `, 
        [id, userId, vote, comment]
    );

    return result;
}