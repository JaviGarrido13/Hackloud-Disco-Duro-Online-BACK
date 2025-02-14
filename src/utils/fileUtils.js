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

        // Devolver la ruta donde se guardó el archivo
        return fileMetadata;
    } catch (error) {
        console.error('Error al guardar archivo:', error);
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
            ? path.join(
                  `${process.cwd()}/uploads/${userId}/${folderName}/${fileName}`
              )
            : path.join(`${process.cwd()}/uploads/${userId}/${fileName}`);
        await fs.unlink(filePath);
        console.log(`${fileName} borrado correctamente`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw generateErrorUtils(
                404,
                'FILE_NOT_FOUND',
                'Archivo no encontrado'
            );
        }
        throw generateErrorUtils(
            409,
            'CONFLICT',
            'Error al eliminar el archivo'
        );
    }
};
