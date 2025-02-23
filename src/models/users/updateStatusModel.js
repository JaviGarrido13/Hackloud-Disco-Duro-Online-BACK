// Funcion que devuelve la conexión la base de datos
import { getPool } from '../../db/getpool.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

// Model para actualizar active
export const updateStatusModel = async (id, active) => {
    const pool = await getPool();
    const [result] = await pool.query(
        'UPDATE users SET active = ? WHERE id = ?',
        [active, id]
    );
    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'ERROR_SETING_ACTIVE',
            'Error al habilitar/deshabilitar el usuario'
        );
    }
    return result;
};
