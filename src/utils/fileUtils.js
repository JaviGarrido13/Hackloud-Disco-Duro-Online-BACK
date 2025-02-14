import fs from 'fs/promises';
import path from 'path';

import { generateErrorUtils } from './helpersUtils.js';
import { createPathUtil } from './foldersUtils.js';

export const saveFileUtil = async (
    userId,
    folderName = NULL,
    fileName,
    fileData
) => {
    try {
        const userPath = folderName
            ? path.join(`${process.cwd()}/uploads/${userId}/${folderName}`)
            : path.join(`${process.cwd()}/uploads/${userId}`);
        await fs.mkdir(userPath, { recursive: true });
        const filePath = path.join(userPath, fileName);
        await fs.writeFile(filePath, fileData);
        console.log(`Archivo ${fileName} guardado en ${filePath}`);
        return filePath;
    } catch (error) {
        throw generateErrorUtils(
            409,
            'CONFLICT',
            'No se pudo guardar el archivo'
        );
    }
};

export const deleteFileUtil = async (userId, fileName, folderName = NULL) => {
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
