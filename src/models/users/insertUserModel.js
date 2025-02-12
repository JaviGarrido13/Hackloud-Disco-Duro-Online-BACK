// Importamos funcion que devuelve la conexión con la base de datos

import { getPool } from '../../db/getpool.js';

// Model para insertar un nuevo ususario
export const insertUserModel = async (user) => {
    const pool = await getPool();
    const { id, username, email, password, registrationCode } = user;

    // Query de la creación del usuario en la BD
    const [result] = await pool.query(
        'INSERT INTO users (id, username, email, password,registrationCode) VALUES (?,?,?,?,?)',
        [id, username, email, password, registrationCode]
    );

    // Si la creación fue exitosa, devolver el id del usuario recién creado
    return result;
};
