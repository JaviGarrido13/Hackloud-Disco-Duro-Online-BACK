// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';

export const updateAvatarModel = async (id, avatarFilePath) => {
    // Obtener el pool de conexiones
    const pool = await getPool();

    // Actualizar en la base de datos el avatar del usuario
    const [result] = await pool.query(
        ` UPDATE users SET avatar = ? WHERE id = ? `,
        [avatarFilePath, id]
    );

    return result.affectedRows > 0
        ? { message: 'Avatar actualizado' }
        : { message: 'Error al actualizar el avatar' };
};
