// Importamos dependencias
import crypto from 'crypto';
import path from 'path';

// Importamos el model
import { uploadFileModel } from '../../models/storages/uploadFileModel.js';

// Importamos el util
import { saveFileUtil } from '../../utils/fileUtils.js';

// Service que se encarga de guardar el archivo
export const uploadFilesService = async (userId, file, folderName) => {
    // Destructuring de file
    const { originalname, filename, size } = file;

    // Path del archivo
    const filePath = path.join(
        'uploads',
        userId,
        folderName ? folderName : '',
        filename
    );

    // creamos el objeto fileData
    const fileData = {
        name: originalname,
        path: filePath,
        size,
        userId,
    };

    // Llamamos al util que guarda el archivo
    const savedFile = await saveFileUtil(
        userId,
        folderName,
        filename,
        fileData
    );

    // Generamos id unica
    const fileId = crypto.randomUUID();

    // Llamamos al model para subir el archivo a la base de datos
    const uploadedFile = await uploadFileModel({
        fileId,
        filename,
        size,
        userId,
        folderName,
    });

    return uploadedFile;
};
