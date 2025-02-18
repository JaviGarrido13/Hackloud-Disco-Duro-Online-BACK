// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

import generateErrorUtils from '../../utils/helpersUtils.js';

// Model para eliminar el archivo
export const deleteFileModel = async (fileId) => {
    // Obtenemos pool de conexiones
    const pool = await getPool();

    // Query a la DDBB
    const [result] = await pool.query('DELETE FROM files WHERE id = ?', [
        fileId,
    ]);
    if (result.affectedRows > 0) {
        return { message: 'Archivo eliminado correctamente' };
    } else {
        throw generateErrorUtils(
            500,
            'DELETE_FILE_FAILED',
            'No se pudo borrar el archivo'
        );
    }
};
