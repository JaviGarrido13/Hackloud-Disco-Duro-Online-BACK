// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const updateRecoveryPassCodeModel = async (id, recoveryPassCode) => {
    // Obtiene la conexión a la DDBB
    const pool = await getPool();

    // Actualiza el recoveryPassCode en el usuario
    const [result] = await pool.query(
        `UPDATE users SET recoveryPassCode = ? WHERE id = ?`,
        [recoveryPassCode, id]
    );

    // Devuelve el resultado
    return result;
};
