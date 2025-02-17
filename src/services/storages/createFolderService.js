import crypto from 'crypto';
import { createNewFolderModel } from '../../models/storages/createNewFolderModel.js';
import { createPathUtil } from '../../utils/foldersUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';
import { selectFolderByName } from '../../models/storages/selectFolderByName.js';

export const createFolderService = async (folderName, userId) => {
    const folder = await selectFolderByName(folderName);
    if (folder) {
        throw generateErrorUtils(
            409,
            'FOLDER_ALREADY_EXISTS',
            'Ya existe una carpeta con ese nombre'
        );
    }

    const folderPath = await createPathUtil(userId, folderName);

    const folderId = crypto.randomUUID();

    const result = await createNewFolderModel(folderId, folderName, userId);

    result;
};
