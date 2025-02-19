//Importamos conexion con base de datos
import { getPool } from '../../db/getpool';

//Model para eliminar un usuario por su Id
export const deleteUserModel = async (id) => {
    const pool = await getPool();

    //Query para eliminar al usuario
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    return result;
};
