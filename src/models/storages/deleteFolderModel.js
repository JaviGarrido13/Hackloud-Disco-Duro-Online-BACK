// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

// Importamos función para generar errores
import generateErrorUtils from '../../utils/helpersUtils.js';

export const deleteFolderModel = async (folderId, userId) => {
    const pool = await getPool();

    // Verificar que la carpeta existe y pertenece al usuario
    const [folder] = await pool.query(
        'SELECT * FROM folders WHERE id = ? AND userId = ?',
        [folderId, userId]
    );
    if (folder.length === 0) {
        throw generateErrorUtils(
            404,
            'FOLDER_NOT_FOUND',
            'La carpeta no existe o no tienes permisos.'
        );
    }

    const folderName = folder[0].name;

    // Eliminar archivos dentro de la carpeta
    await pool.query('DELETE FROM files WHERE folderId = ?', [folderId]);

    // Eliminar la carpeta
    const [result] = await pool.query('DELETE FROM folders WHERE id = ?', [
        folderId,
    ]);

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'DELETE_FOLDER_FAILED',
            'No se pudo eliminar la carpeta.'
        );
    }

    return { name: folderName };
};
