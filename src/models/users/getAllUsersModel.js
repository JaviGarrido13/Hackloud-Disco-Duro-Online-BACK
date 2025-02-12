// Importamos función pque devuelve pool de conexiones
import { getPool } from '../../db/getpool.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Model para listar usuarios
export const getAllUsersModel = async () => {
    const pool = await getPool();

    // 2. Realizar la consulta para obtener todos los usuarios
    const [users] = await pool.query(
        'SELECT id, username, firstName, lastName, email, avatar, role, createdAt, updatedAt FROM users'
    );
    if (!users.length) {
        throw generateErrorUtils(
            404,
            'NO_USERS_FOUND',
            'No se han encontrado usuarios'
        );
    }

    // 3. Devolver los usuarios
    return users;
};
