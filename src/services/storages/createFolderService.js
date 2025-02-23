// Importamos dependencias
import crypto from 'crypto';

// Importamos models
import { selectFolderByName } from '../../models/storages/selectFolderByName.js';
import { createNewFolderModel } from '../../models/storages/createNewFolderModel.js';

// Importamos util
import { createPathUtil } from '../../utils/foldersUtils.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Service que se encarga de crear carpetas
export const createFolderService = async (folderName, userId) => {
    const folder = await selectFolderByName(folderName);
    if (folder) {
        throw generateErrorUtils(
            409,
            'FOLDER_ALREADY_EXISTS',
            'Ya existe una carpeta con ese nombre'
        );
    }

    await createPathUtil(userId, folderName);

    const folderId = crypto.randomUUID();

    const result = await createNewFolderModel(folderId, folderName, userId);
    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            'INSERT_FAILD',
            'No se pudo crear la carpeta'
        );
    }

    return folderId;
};
