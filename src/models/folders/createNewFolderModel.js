import { getPool } from "../../db/getpool.js"

export const createNewFolderModel = async (foldersId, foldersName, foldersUserId) => {

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO folders (id, name, userId)
        VALUES (?, ?, ?)
        `,
        [foldersId, foldersName, foldersUserId]
    );

    return result;
};
