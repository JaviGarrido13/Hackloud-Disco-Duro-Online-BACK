import fs from 'fs/promises';
import path from 'path';

import { generateErrorUtils } from './helpersUtils.js';
import { createPathUtil } from './foldersUtils.js';

// Función para guardar cualquier tipo de archivo
export const saveFilesUtils = async (userRelativePath, files) => {
    // Crea el directorio si no existe
    await createPathUtil(path.join(process.cwd(), userRelativePath));

    // Convierte a array si solo recibe un archivo
    const filesArray = Array.isArray(files) ? files : [files];

    // Guarda cada archivo
    const savedFiles = [];

    for (const file of filesArray) {
        const filePath = path.join(process.cwd(), userRelativePath, file.name);

        // Guarda el archivo
        await fs.writeFile(filePath, file.data);
        console.log(`Archivo guardado en: ${filePath}`);

        // Agrega a la lista de archivos guardados
        savedFiles.push(file.name);
    }

    return savedFiles;
};

// Función para borrar uno o varios archivos
export const deleteFilesUtil = async (filePaths) => {
    // Convertir a array si solo se recibe un archivo
    const pathsArray = Array.isArray(filePaths) ? filePaths : [filePaths];

    for (const filePath of pathsArray) {
        try {
            await fs.unlink(filePath);
            console.log(`Archivo eliminado correctamente: ${filePath}`);
        } catch (error) {
            throw generateErrorUtils(
                500,
                'DELETE_FILE_ERROR',
                `No se ha podido borrar el archivo: ${filePath}`
            );
        }
    }
};
