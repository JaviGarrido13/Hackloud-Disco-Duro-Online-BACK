import { getPool } from '../../db/getpool.js';

export const updatePasswordUserModel = async (id, password) => {
    // Obtiene la conexión
    const pool = await getPool();

    // Realiza la consulta
    const [result] = await pool.query(
        `UPDATE users SET password = ? WHERE id = ?;`,
        [password, id]
    );

    // Devuelve el resultado
    return result;
};
