// Importamos funcion que devuelve la conexión con la base de datos
import { getPool } from '../../db/getpool.js';

export const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM users WHERE email = ?;`, [
        email,
    ]);

    return user[0];
};
