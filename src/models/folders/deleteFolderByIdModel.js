import { getPool } from "../../db/getpool.js"
import generateErrorUtils from "../../utils/helpersUtils.js";

export const deleteFolderByIdModel = async (folderId, userId) => {
    const pool = await getPool();

    const [folder] = await pool.query(
        `
        SELECT*FROM folders
        WHERE id = ? AND userId = ?
        `, 
        [folderId, userId]
    ) 
    if (folder.length === 0) {
        throw generateErrorUtils(404, 'FOLDER_NOT_FOUND', 'La carpeta no existe')
    }
    const folderName = folder[0].name  

    // Borrar archivos del folder
    await pool.query('DELETE FROM files WHERE folderId = ?', [folderId])

    const [result] = await pool.query(
        `
        DELETE FROM folders
        WHERE id = ?
        `,
        [folderId]
    );

    if (result.affectedRows === 0){
        throw generateErrorUtils(500, 'DELETE_FOLDER_FAILED', 'No se pudo eliminar la carpeta')
    }

    return {name: folderName};
}