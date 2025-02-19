//Importamos conexion con base de datos
import { getPool } from '../../db/getpool';

//Model para eliminar un usuario por su Id
export const deleteUserModel = async (id) => {
    const pool = await getPool();

    //Query para eliminar al usuario, archivos asociados y carpetas asociadas
    try {
        await pool.beginTransaction();
        await pool.query('DELETE FROM files WHERE userId = ?', [userId]);
        await pool.query('DELETE FROM folders WHERE userId = ?', [userId]);
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [
            id,
        ]);
        await pool.commit();

        return result.affectedRows > 0;
    } catch (error) {
        await pool.rollback();
        throw generateErrorUtils(
            409,
            'CONFLICT',
            'No se pudo eliminar el usuario'
        );
    }
};
