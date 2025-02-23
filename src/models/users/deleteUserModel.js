//Importamos conexion con base de datos
import { getPool } from '../../db/getpool.js';

//Model para eliminar un usuario por su Id
export const deleteUserModel = async (id) => {
    const pool = await getPool();

    //Query para eliminar al usuario, archivos asociados y carpetas asociadas

    await pool.query(`DELETE FROM assessments WHERE userId = ?`, [id]);
    await pool.query('DELETE FROM files WHERE userId = ?', [id]);
    await pool.query('DELETE FROM folders WHERE userId = ?', [id]);
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    return result.affectedRows > 0 ? true : false;
};
