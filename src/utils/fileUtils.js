import fs from 'fs/promises';
import path from 'path';

import generateErrorUtils from './helpersUtils.js';

export const saveFileUtil = async (
    userId,
    folderName = null,
    fileName,
    fileData
) => {
    try {
        // Construir la ruta del usuario usando path.join
        const userPath = path.join(
            process.cwd(),
            'uploads',
            userId,
            folderName || ''
        );

        // Asegurar que el directorio existe
        await fs.mkdir(userPath, { recursive: true });

        // Guardar los metadatos del archivo
        const fileMetadata = {
            name: fileData.name,
            path: fileData.path,
            size: fileData.size,
            userId: fileData.userId,
            createdAt: new Date().toISOString(),
        };
        console.log('Metadatos del archivo:', fileMetadata);
        // Devolver fileMetaData
        return fileMetadata;
    } catch (error) {
        throw generateErrorUtils(
            409,
            'CONFLICT',
            'No se pudo guardar el archivo'
        );
    }
};

export const deleteFileUtil = async (userId, fileName, folderName = null) => {
    try {
        const filePath = folderName
            ? path.join(process.cwd(), 'uploads', userId, folderName, fileName)
            : path.join(process.cwd(), 'uploads', userId, fileName);

        try {
            await fs.access(filePath);
        } catch (error) {
            throw generateErrorUtils(
                404,
                'FILE_NOT_FOUND',
                `Archivo no encontrado en ${filePath}`
            );
        }

        await fs.unlink(filePath);
        console.log(`${fileName} eliminado correctamente de ${filePath}`);
    } catch (error) {
        throw generateErrorUtils(
            500,
            'DELETE_FAILED',
            `Error al eliminar el archivo: ${error.message}`
        );
    }
};

export const renameFileUtil = async (
    userId,
    folderName = null,
    oldName,
    newName
) => {
    try {
        const userPath = folderName
            ? path.join(process.cwd(), 'uploads', userId, folderName)
            : path.join(process.cwd(), 'uploads', userId);

        const oldFilePath = path.join(userPath, oldName);

        // Extraer la extensión del archivo original
        const ext = path.extname(oldName);

        // Si el nuevo nombre no incluye extensión, mantener la original
        const newFileName = path.extname(newName)
            ? newName
            : `${newName}${ext}`;
        const newFilePath = path.join(userPath, newFileName);

        // Verificar si el archivo existe
        try {
            await fs.stat(oldFilePath);
        } catch (error) {
            throw generateErrorUtils(
                404,
                'FILE_NOT_FOUND',
                `El archivo no existe en la ruta ${oldFilePath}`
            );
        }

        // Renombrar el archivo
        await fs.rename(oldFilePath, newFilePath);
        console.log(`📂 Archivo renombrado: ${oldName} ➝ ${newFileName}`);

        return { oldName, newFileName };
    } catch (error) {
        throw generateErrorUtils(
            500,
            'FILE_RENAME_FAILED',
            `No se pudo renombrar el archivo, error: ${error.message}`
        );
    }
};
