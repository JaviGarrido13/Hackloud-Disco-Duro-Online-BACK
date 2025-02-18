import path from 'path';
import { promises as fs } from 'fs';
import generateErrorUtils from './helpersUtils.js';

export const createUserPath = async (userId) => {
    const rootPath = path.join(process.cwd(), 'uploads', userId);
    try {
        await fs.access(rootPath);
    } catch (error) {
        // Crea carpeta Raiz si no existe
        await fs.mkdir(rootPath, { recursive: true });
        console.log(`📂 Ruta raiz creada: ${rootPath}`);
    }
    return rootPath;
};

export const createPathUtil = async (userId, nameFolder) => {
    const folderPath = path.join(process.cwd(), 'uploads', userId, nameFolder);
    try {
        await fs.access(folderPath);
    } catch (error) {
        // Si no existe el directorio, lo creamos
        await fs.mkdir(folderPath, { recursive: true });
        console.log(`📂 Directorio ${folderPath} creado correctamente`);
    }
    return folderPath;
};

export const deleteFolderUtil = async (userId, nameFolder) => {
    try {
        if (!nameFolder) {
            throw generateErrorUtils(
                400,
                'INVALID_FOLDER',
                'El nombre de la carpeta no es válido.'
            );
        }

        const folderPath = path.join(
            process.cwd(),
            'uploads',
            userId,
            nameFolder
        );

        // Verificar si la carpeta existe antes de eliminarla
        try {
            await fs.access(folderPath); // Si no existe, lanza un error
        } catch (error) {
            throw generateErrorUtils(
                404,
                'FOLDER_NOT_FOUND',
                `No se encontró la carpeta en ${folderPath}`
            );
        }

        // Eliminar la carpeta y todo su contenido
        await fs.rm(folderPath, { recursive: true });

        console.log(`✅ Carpeta eliminada: ${folderPath}`);
    } catch (error) {
        throw generateErrorUtils(
            500,
            'DELETE_FOLDER_FAILED',
            `Error al eliminar la carpeta: ${error.message}`
        );
    }
};

export const renameFolderUtil = async (
    userId,
    oldNameFolder,
    newNameFolder
) => {
    try {
        const rootPath = path.join(process.cwd(), 'uploads', userId);
        const oldFolder = path.join(rootPath, oldNameFolder);
        const newFolder = path.join(rootPath, newNameFolder);
        // Verificar que el directorio existe
        try {
            await fs.access(oldFolder);
        } catch (error) {
            throw generateErrorUtils(
                404,
                'FOLDER_NOT_FOUND',
                'La carpeta no existe'
            );
        }
        await fs.rename(oldFolder, newFolder);
        console.log(
            `📂 Carpeta ${oldNameFolder} renombrada correctamente a ${newNameFolder}`
        );
        return { oldNameFolder, newNameFolder };
    } catch (error) {
        throw generateErrorUtils(
            500,
            'FOLDER_RENAME_FAILED',
            `No se pudo renombrar la carpeta, error: ${error.message}`
        );
    }
};
