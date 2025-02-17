import fs from 'fs/promises'
import generateErrorUtils from './helpersUtils.js';

export const saveFolderUtil = async (folderSqlPath) => {
    try {
        try {
            // Comprobar si el folder existe
            await fs.access(folderSqlPath);
            console.log(`Ya existe el directorio: ${folderSqlPath}`);

        } catch (error) {
            // Si no existe el folder, se lanzara un error
            if (error.code === 'ENOENT') {
                // No existe el folder, entonces se crea
                await fs.mkdir(folderSqlPath, { recursive: true});
                console.log(`Se ha creado correctamente el directorio: ${folderSqlPath}`);
            } else {
                console.error('Error al acceder a la carpeta:', error);
            }
        }
    } catch (error) {
        throw generateErrorUtils(
            500,
            'CREATE_FOLDER_ERROR',
            'Error creating folder'
        );
    }
};