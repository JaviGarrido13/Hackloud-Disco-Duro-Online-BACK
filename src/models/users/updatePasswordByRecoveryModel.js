import { getPool } from '../../db/getpool.js';

export const updatePasswordByRecoveryModel = async (id, password) => {
    // Obtiene la conexión con la DDBB
    const pool = await getPool();

    // Realiza la consulta con la query
    const [result] = await pool.query(
        `UPDATE users SET password = ?, recoveryPassCode = NULL WHERE id = ?`,
        [password, id]
    );

    // Devuelve el resultado
    return result;
};
