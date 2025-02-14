import { uploadFileModel } from '../../models/storages/uploadFileModel.js';
import { saveFileUtil } from '../../utils/fileUtils.js';
import crypto from 'crypto';
import path from 'path';

export const uploadFilesService = async (file) => {
    const { userId, folderName, originalname, filename, size } = file;

    const filePath = path.join(
        'uploads',
        folderName ? folderName : '',
        filename
    );

    const fileData = {
        name: originalname,
        path: filePath,
        size,
        userId,
    };

    const savedFile = await saveFileUtil(
        userId,
        folderName,
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
