// Importamos función que devuelve el pool
import { getPool } from '../../db/getpool.js';

// Model par recueperar un user por su regCode
export const SelectUserByRegCode = async (registrationCode) => {
    const pool = await getPool();

    // Query a la BD para buscar por RegistrationCode
    const [user] = await pool.query(
        'SELECT id, active FROM users WHERE registrationCode =?',
        [registrationCode]
    );

    return user[0];
};
