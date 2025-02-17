// Importamos función que devuelve pool con la ddbb
import { getPool } from '../../db/getpool.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

// Model para manejar la subida de archivos
export const uploadFileModel = async ({
    fileId,
    filename,
    size,
    userId,
    folderId,
}) => {
    // Obtenemos pool de conexiones
    const pool = await getPool();

    // Query a la ddbb
    const [result] = await pool.query(
        'INSERT INTO files (id, name, size, userId, folderId) VALUES (?,?,?,?,?)',
        [fileId, filename, size, userId, folderId]
    );
    if (result.affectedRows > 0) {
        return {
            id: fileId,
            name: filename,
        };
    } else {
        throw generateErrorUtils(
            500,
            'INSERT_FAILED',
            'No se pudo subir el archivo'
        );
    }
};
