import { MYSQL_DATABASE } from '../../env.js';

export const initDb = async () => {
    try {
        // Obtener el pool de conexiones
        const pool = await getPool();

        // Poner la DDBB en uso
        console.log('Poniendo en uso la base de datos 📑');
        await pool.query(`USE ${MYSQL_DATABASE}`);
        console.log('Base de datos en uso ✅ 📑');

        //Borrar las tablas si existen
        console.log('Borrando tablas existentes 🗑 📑');
        await pool.query(
            'DROP TABLE IF EXISTS  sharedFiles, assessments, files, folders, users;'
        );
        console.log('Tablas borradas ✅ 📑');

        //crear tablas en la base de datos
        console.log('Creaando tablas de nuevo 📑');
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
                name VARCHAR(100) NOT NULL,
                size BIGINT NOT NULL,
                type VARCHAR(50) NOT NULL,
                userId CHAR(36) NOT NULL,
                folderId CHAR(40) NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (folderId) REFERENCES folders(id) ON DELETE CASCADE
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
        //crear tabla de archivos compartidos
        await pool.query(`
            CREATE TABLE sharedFiles (
                id CHAR(36) PRIMARY KEY NOT NULL,
                userId CHAR(36) NOT NULL,
                fileId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (fileId) REFERENCES files(id) ON DELETE CASCADE
                );
            `);

        console.log('Tablas creadas✅ 📑');
    } catch (error) {
        console.error('Error al inicializar la base de datos');
    }
};

initDb();
