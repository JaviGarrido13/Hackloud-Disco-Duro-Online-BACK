// Importamos las dependencias
import bcrypt from 'bcrypt';

// Importamos funcion que devuelve la conexión con la base de datos
import { getPool } from './getpool.js';

// Importamos variables de entorno
import { ADMIN_EMAIL, ADMIN_PASSWORD, MYSQL_DATABASE } from '../../env.js';

// Importamos el errores
import generateErrorUtils from '../utils/helpersUtils.js';

export const initDb = async () => {
    let pool;
    try {
        // Obtener el pool de conexiones
        pool = await getPool();

        // Poner la DDBB en uso
        console.log('Poniendo en uso la base de datos 📑');
        await pool.query(`USE ${MYSQL_DATABASE}`);
        console.log('Base de datos en uso ✅ 📑');

        //Borrar las tablas si existen
        console.log('Borrando tablas existentes 🗑 📑');
        await pool.query(
            'DROP TABLE IF EXISTS  assessments, files, folders, users;'
        );
        console.log('Tablas borradas ✅ 📑');

        //crear tablas en la base de datos
        console.log('Creando tablas de nuevo 📑');
        //crear tabla usuarios
        await pool.query(`
            CREATE TABLE users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                firstName VARCHAR(50),
                lastName VARCHAR(50),
                email VARCHAR(100) UNIQUE NOT NULL,
                password CHAR(60) NOT NULL,
                avatar CHAR(40) DEFAULT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
                registrationCode CHAR(15) DEFAULT NULL,
                recoveryPassCode CHAR(15) DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
                );
            `);
        //crear tabla de carpetas
        await pool.query(`
            CREATE TABLE folders (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(100) NOT NULL,
                userId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
        //crear tabla de archivos
        await pool.query(`
            CREATE TABLE files (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(255) NOT NULL,
                size BIGINT NOT NULL,
                userId CHAR(36) NOT NULL,
                folderId CHAR(40) NULL,
                uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (folderId) REFERENCES folders(id) ON DELETE SET NULL
                );
            `);
        //crear tabla de valoraciones
        await pool.query(`
            CREATE TABLE assessments (
                id CHAR(36) PRIMARY KEY NOT NULL,
                userId CHAR(36) NOT NULL,
                vote TINYINT UNSIGNED NOT NULL,
                comment TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
                );
            `);

        console.log('Tablas creadas✅ 📑');
        // Crear usuario admin
        console.log('Creando usuario Admin...');
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        await pool.query(
            `INSERT INTO users (id, username, firstName, lastName, email, password, active, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                'admin',
                'Super',
                'Admin',
                ADMIN_EMAIL,
                hashedPassword,
                1,
                'admin',
            ]
        );
        // Cerrar la conexión
        await pool.end();
        // Terminamos el proceso
        console.log('Todo salió bien');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
        throw generateErrorUtils(
            500,
            'DB_INIT_ERROR',
            `Error al inicializar la base de datos : ${error.message}`
        );
    }
};

initDb();
