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
        const folderPath = path.join(
            process.cwd(),
            'uploads',
            userId,
            nameFolder
        );
        await fs.rm(folderPath, { recursive: true, force: true });
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw generateErrorUtils(
                404,
                'FOLDER_NOT_FOUND',
                'Carpeta no encontrada'
            );
        }
        throw generateErrorUtils(
            409,
            'CONFLICT',
            'Hubo un error al intentar eliminar la carpeta'
        );
    }
};
