import { getFilePath } from '../../utils/fileUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';
import { getResourceByShareToken } from '../../models/storages/shareFileOrFolderModel.js';

export const getSharedFileService = async (shareToken) => {
    const resource = await getResourceByShareToken(shareToken);

    if (!resource) {
        throw generateErrorUtils(404, 'NOT_FOUND', 'El archivo ya no existe');
    } else if (resource.type !== 'file') {
        throw generateErrorUtils(
            403,
            'FORBIDEN',
            'No puedes descargar carpetas'
        );
    }

    let folderName;
    if (resource.folderId) {
        const folder = await selectFolderByIdModel(resource.folderId);
        folderName = folder.name;
    }

    return await getFilePath(resource, folderName);
};
