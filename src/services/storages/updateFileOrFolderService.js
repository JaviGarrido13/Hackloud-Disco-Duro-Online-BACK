// Importamos los models
import {
    updateFileModel,
    updateFolderModel,
} from '../../models/storages/updateFileOrFolderModel.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Service que se encarga de actualizar el nombre de un archivo
export const updateFileNameService = async (id, newName) => {
    // Llamamos al model que actualiza el file
    const updatedFile = await updateFileModel(id, newName);
    // Si no llega updtatedFile, lanzamos un error
    if (!updatedFile) {
        throw generateErrorUtils(
            500,
            'FILE_NOT_FOUND',
            'Error al actualizar el archivo'
        );
    }

    return updatedFile;
};

// Service que se encarga de actualizar el nombre de un archivo
export const updateFolderNameService = async (id, newName) => {
    // Llamamos al model que actualiza el folder
    const updatedFolder = await updateFolderModel(id, newName);
    // Si no llega updtatedFolder, lanzamos un error
    if (!updatedFolder) {
        throw generateErrorUtils(
            500,
            'FOLDER_NOT_FOUND',
            'Error al actualizar la carpeta'
        );
    }
    return updatedFolder;
};
