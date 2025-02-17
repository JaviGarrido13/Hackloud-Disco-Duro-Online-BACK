import { deleteFileUtil } from '../../utils/fileUtils.js';
import { deleteFileModel } from '../../models/storages/deleteFileModel.js';

export const deleteFileService = async (fileId, userId, folderName = null) => {
    await deleteFileUtil(userId, fileName, folderName);
    const deleteModel = await deleteFileModel(fileId);
    return deleteModel;
};
