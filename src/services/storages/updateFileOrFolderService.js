// Importamos los utils
import { renameFileUtil } from '../../utils/fileUtils.js';
import { renameFolderUtil } from '../../utils/foldersUtils.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los models
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';
import {
    updateFileModel,
    updateFolderModel,
} from '../../models/storages/updateFileOrFolderModel.js';

// Service que se encarga de actualizar el nombre de un archivo
export const updateFileNameService = async (file, newName) => {
    const id = file.id;
    const oldName = file.name;
    const userId = file.userId;
    const folderId = file.folderId || null;

    let folderName = null;
    if (folderId) {
        const folder = await selectFolderByIdModel(folderId);
        if (!folder) {
            throw generateErrorUtils(
                404,
                'FOLDER_NOT_FOUND',
                'La carpeta no existe no existe'
            );
        }
        folderName = folder.name;
    }

    // Renombrar en el sistema de archivos
    const renamedFile = await renameFileUtil(
        userId,
        folderName,
        oldName,
        newName
    );
    const { newFileName } = renamedFile;

    // Llamamos al model que actualiza el file
    await updateFileModel(id, newFileName);

    return newFileName;
};

// Service que se encarga de actualizar el nombre de una carpeta
export const updateFolderNameService = async (resource, newName) => {
    const id = resource.id;
    const oldName = resource.name;
    const userId = resource.userId;
    // Renombrar en el sistema de archivos
    const renamedFolder = await renameFolderUtil(userId, oldName, newName);
    const { newNameFolder } = renamedFolder;
    // Llamamos al model que actualiza el folder
    await updateFolderModel(id, newNameFolder);

    return newNameFolder;
};
