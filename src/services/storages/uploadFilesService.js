import { uploadFileModel } from '../../models/storages/uploadFileModel.js';
import { saveFileUtil } from '../../utils/fileUtils.js';

export const uploadFilesService = async (file) => {
    const { userId, folderName, originalname, filename, size } = file;

    const filePath = folderName
        ? `uploads/${folderName}/${filename}`
        : `uploads/${filename}`;
    const fileData = { name: originalname, path: filePath, size, userId };
    const savedFile = await saveFileUtil(
        userId,
        (folderName = NULL),
        filename,
        fileData
    );
    const fileId = crypto.randomUUID();
    const uploadedFile = await uploadFileModel({
        fileId,
        filename,
        size,
        userId,
        folderName,
    });
    return uploadedFile;
};
