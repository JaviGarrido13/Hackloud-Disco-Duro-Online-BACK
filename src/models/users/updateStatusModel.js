// Funcion que devuelve la conexión la base de datos
import { getPool } from '../../db/getpool.js';

// Model para actualizar active
export const updateStatusModel = async (id, active) => {
    const pool = await getPool();
    const [result] = await pool.query(
        'UPDATE users SET active = ? WHERE id = ?',
        [active, id]
    );
    return result;
};
