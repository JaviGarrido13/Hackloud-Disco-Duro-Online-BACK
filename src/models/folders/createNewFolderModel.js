import path from "path";
import { getPool } from "../../db/getpool.js"
import fs from 'fs'


const folderSqlPath = path.resolve("uploads");

export const createNewFolderModel = async (foldersId, foldersName, foldersUserId) => {

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO folders (id, name, userId)
        VALUES (?, ?, ?)
        `,
        [foldersId, foldersName, foldersUserId]
    );

    try {
        // Crear la ruta completa de la carpeta
        const folderPath = path.join(folderSqlPath, foldersId);

        // Verificar si la carpeta existe antes de crearla
        try {
            await fs.access(folderPath);
            console.log(`La carpeta '${foldersName}' con ID ${foldersId} ya existe.`);
        } catch {
            await fs.mkdir(folderPath);
            console.log(`Carpeta '${foldersName}' creada en: ${folderPath}`);
        }

    } catch (error) {
        console.error(`Error al crear la carpeta: ${error}`);
        throw error;
    }

    return result;
};
