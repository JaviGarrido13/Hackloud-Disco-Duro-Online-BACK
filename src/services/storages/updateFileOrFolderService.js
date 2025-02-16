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
    // Devolvemos updatedFile o lanzamos un error
    return (
        updatedFile ||
        generateErrorUtils(404, 'FILE_NOT_FOUND', 'El archivo no existe.')
    );
};

// Service que se encarga de actualizar el nombre de un archivo
export const updateFolderNameService = async (id, newName) => {
    // Llamamos al model que actualiza el folder
    const updatedFolder = await updateFolderModel(id, newName);
    // Devolvemos updatedFolder o lanzamos un error
    return (
        updatedFolder ||
        generateErrorUtils(404, 'FOLDER_NOT_FOUND', 'El folder no existe.')
    );
};
