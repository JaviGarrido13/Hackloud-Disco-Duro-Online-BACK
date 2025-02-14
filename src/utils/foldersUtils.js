import path from 'path';
import fs from 'fs';
import generateErrorUtils from './helpersUtils.js';

export const createUserPath = async (userId) => {
    try {
        // Crea Ruta raiz
        const rootPath = path.join(`${process.cwd()}/uploads/${userId}`);
        await fs.access(rootPath);
    } catch (error) {
        // Crea carpeta Raiz
        await fs.mkdir(rootPath, { recursive: true });
        console.log(`📂 Ruta raiz creada`);
    }
};

export const createPathUtil = async (userId, nameFolder) => {
    try {
        // Crea la Ruta de la carpeta
        const folderPath = path.join(
            `${process.cwd()}/uploads/${userId}/${nameFolder}`
        );
        await fs.access(folderPath);
    } catch (error) {
        // Si no existe el directorio, entra en el error del catch y lo crea
        await fs.mkdir(folderPath, { recursive: true });
        console.log(`📂 Directorio ${folderPath} creado correctamente`);
    }
};

export const deleteFolderUtil = async (userId, nameFolder) => {
    try {
        // Crea la Ruta de la carpeta
        const folderPath = path.join(
            `${process.cwd()}/uploads/${userId}/${nameFolder}`
        );
        // Borramos la carpeta
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
