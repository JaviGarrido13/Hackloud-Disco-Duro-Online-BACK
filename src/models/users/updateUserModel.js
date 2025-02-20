// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const updateUserModel = async (id, data) => {
    //Conectar con la base de datos
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE users SET username = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?`,
        [data.username, data.firstName, data.lastName, data.email, id]
    );

    return result;
};
