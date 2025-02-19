//Importamos conexion con base de datos
import { getPool } from '../../db/getpool';

//Model para eliminar un usuario por su Id
export const deleteUserModel = async (id) => {
    const pool = await getPool();

    //Query para eliminar al usuario, archivos asociados y carpetas asociadas
    try {
        const [files] = await pool.query('DELETE FROM files WHERE userId = ?', [
            userId,
        ]);
        const [folders] = await pool.query(
            'DELETE FROM folders WHERE userId = ?',
            [userId]
        );
        const [users] = await pool.query('DELETE FROM users WHERE id = ?', [
            id,
        ]);

        const result = { files, folders, users };

        return result;
    } catch (error) {
        throw error;
    }
};
