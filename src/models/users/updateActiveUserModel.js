// Importamos función que devuelve la conexión con las base de datos
import { getPool } from '../../db/getpool.js';

// Model para activar un user
export const updateActiveUserModel = async (registrationCode) => {
    const pool = await getPool();

    // Query para actualizar en la BD
    const result = await pool.query(
        'UPDATE users SET active = 1 WHERE registrationCode =?',
        [registrationCode]
    );

    return result;
};
