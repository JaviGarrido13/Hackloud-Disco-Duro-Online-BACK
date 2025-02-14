// Función que devuelve la conexión a la base de datos
import { getPool } from '../../db/getpool.js';

// Model que actualiza el nombre de un archivo
export const updateFileModel = async (id, newName) => {
    const pool = await getPool();
    const [result] = await pool.query(
        'UPDATE files SET name = ? WHERE id = ?',
        [newName, id]
    );
    return result.affectedRows > 0 ? { id, name: newName } : null;
};

// Model que actualiza el nombre de una carpeta
export const updateFolderModel = async (id, newName) => {
    const pool = await getPool();
    const [result] = await pool.query(
        'UPDATE folders SET name = ? WHERE id = ?',
        [newName, id]
    );
    return result.affectedRows > 0 ? { id, name: newName } : null;
};
