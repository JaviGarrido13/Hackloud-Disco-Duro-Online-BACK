import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';
import { getResourceByShareToken } from '../../models/storages/shareFileOrFolderModel.js';
import { getFilePath } from '../../utils/fileUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getSharedFileService = async (shareToken) => {
    const resource = await getResourceByShareToken(shareToken);

    if (!resource || resource.type !== 'file') {
        throw generateErrorUtils(
            403,
            'FORBIDEN',
            'No puedes descargar carpetas'
        );
    }
    const file = await selectFileByIdModel(resource.id);

    let folderName;
    if (file.folderId) {
        const folder = await selectFolderByIdModel(file.folderId);
        folderName = folder.name;
    }

    return await getFilePath(file, folderName);
};
