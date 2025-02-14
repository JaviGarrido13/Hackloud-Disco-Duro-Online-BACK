// Importamos los models
import {
    updateFileModel,
    updateFolderModel,
} from '../../models/storage/updateFileOrFolderModel.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Service que se encarga de actualizar el nombre de un archivo
export const updateFileNameService = async (id, newName) => {
    // Llamamos al model que actualiza el file
    const updatedFile = await updateFileModel(id, newName);
    // Si no recibimos updatedFile , lanzamos un error
    if (!updatedFile) {
        throw generateErrorUtils(
            404,
            'FILE_NOT_FOUND',
            'El archivo no existe.'
        );
    }
    return updatedFile;
};

// Service que se encarga de actualizar el nombre de un archivo
export const updateFolderNameService = async (id, newName) => {
    // Llamamos al model que actualiza el folder
    const updatedFolder = await updateFolderModel(id, newName);
    // Si no recibimos updatedFolder , lanzamos un error
    if (!updatedFolder) {
        throw generateErrorUtils(
            404,
            'FOLDER_NOT_FOUND',
            'El folder no existe.'
        );
    }
    return updatedFolder;
};
