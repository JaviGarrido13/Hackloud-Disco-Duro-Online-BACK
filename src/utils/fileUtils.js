import fs from 'fs/promises';
import path from 'path';

import generateErrorUtils from './helpersUtils.js';

export const saveFileUtil = async (
    userId,
    folderName = null,
    fileName,
    file
) => {
    try {
        // Construir la ruta donde se guardará el archivo
        const uploadPath = folderName
            ? path.join(process.cwd(), 'uploads', userId, folderName)
            : path.join(process.cwd(), 'uploads', userId);

        // Asegurar que el directorio existe
        await fs.mkdir(uploadPath, { recursive: true });

        // Definir el path del archivo
        const filePath = path.join(uploadPath, fileName);

        // Verificar si el buffer es válido
        if (!file || !file.buffer || !Buffer.isBuffer(file.buffer)) {
            throw generateErrorUtils(
                400,
                'INVALID_FILE_BUFFER',
                'El archivo no tiene datos válidos.'
            );
        }

        // Guardar el archivo en el sistema
        await fs.writeFile(filePath, file.buffer);

        return fileName;
    } catch (error) {
        console.log(error);
        throw generateErrorUtils(
            500,
            'FILE_SAVE_FAILED',
            'Error al guardar el archivo.'
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

export const getFilePath = async (file, folderName) => {
    if (!file) {
        throw generateErrorUtils(
            404,
            'FILE_NOT_FOUND',
            'No se encontró el recurso'
        );
    }
    const filePath = path.join(
        process.cwd(),
        'uploads',
        file.userId,
        folderName || '',
        file.name
    );
    if (!fs.access(filePath))
        throw generateErrorUtils(
            404,
            'RESOURCE_NOT_FOUND',
            'El recurso no se encuentra'
        );

    return { filePath, fileName: file.name };
};
