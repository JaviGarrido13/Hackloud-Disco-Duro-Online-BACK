import mysql from 'mysql2/promise';

import {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,
} from '../../env.js';

let pool = null;

export const getPool = async () => {
    try {
        // //pool temporal sin depender de DDBB
        const poolTemp = mysql.createPool({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            port: MYSQL_PORT || 3306,
        });

        //Si no existe la DDBB se crea
        await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

        //Creamos la conexion con la DDBB
        pool = mysql.createPool({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            port: MYSQL_PORT || 3306,
            connectionLimit: 10,
            timezone: 'Z',
        });

        return pool;
    } catch (error) {
        console.error('Error al obtener el pool de conexiones');
    }
};
