// Función que devuelve la conexión a la base de datos
import { getPool } from '../../db/getpool.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Model que actualiza el nombre de un archivo
export const updateFileModel = async (id, newName) => {
    const pool = await getPool();

    // Actualizar en la base de datos
    const [result] = await pool.query(
        'UPDATE files SET name = ? WHERE id = ?',
        [newName, id]
    );
    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            404,
            'FILE_NOT_UPDATED',
            'No se pudo actualizar el archivo'
        );
    }
    return { id, name: newName };
};

// Model que actualiza el nombre de un archivo
export const updateFolderModel = async (id, newName) => {
    const pool = await getPool();

    // Actualizar en la base de datos
    const [result] = await pool.query(
        'UPDATE folders SET name = ? WHERE id = ?',
        [newName, id]
    );
    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            404,
            'FOLDER_NOT_UPDATED',
            'No se pudo actualizar el carpeta'
        );
    }
    return { id, name: newName };
};
