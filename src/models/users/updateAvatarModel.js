// Importamos función que devuelve pool con la DDBB
import { getPool } from '../../db/getpool.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const updateAvatarModel = async (id, avatarName) => {
    // Obtener el pool de conexiones
    const pool = await getPool();

    // Actualizar en la base de datos el avatar del usuario
    const [result] = await pool.query(
        ` UPDATE users SET avatar = ? WHERE id = ? `,
        [avatarName, id]
    );
    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'ERROR_UPDATING_AVATAR',
            'Error al actualizar el avatar en la DDBB'
        );
    }
    return { message: 'Avatar actualizado correctamente' };
};
