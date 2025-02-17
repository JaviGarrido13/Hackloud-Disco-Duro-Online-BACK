import { createPathUtil } from '../../utils/foldersUtils.js';

export const createFolderService = async (name, userId) => {
    const folderPath = await createPathUtil(userId, name);
    const result = await createFolderModel();
};
