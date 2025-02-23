// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const updatePasswordUserModel = async (id, password) => {
    // Obtiene la conexión
    const pool = await getPool();

    // Realiza la consulta
    const [result] = await pool.query(
        `UPDATE users SET password = ?, recoveryPassCode = NULL WHERE id = ?;`,
        [password, id]
    );

    // Devuelve el resultado
    return result;
};
