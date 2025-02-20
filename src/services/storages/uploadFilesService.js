// Importamos dependencias
import crypto from 'crypto';
import path from 'path';

// Importamos el model
import { selectFolderByName } from '../../models/storages/selectFolderByName.js';
import { uploadFileModel } from '../../models/storages/uploadFileModel.js';

// Importamos service
import { createFolderService } from './createFolderService.js';

// Service que se encarga de guardar el archivo
export const uploadFilesService = async (userId, file, folderName) => {
    // Destructuring de file
    const { filename, size } = file;

    // Si llega con folderName, buscamos en la ddbb
    let folderId;
    if (folderName) {
        const folder = await selectFolderByName(folderName);
        if (folder) {
            folderId = folder.id;
        } else {
            // Si no existe el folder, creamos uno
            const newFolder = await createFolderService(folderName, userId);
            folderId = newFolder;
        }
    }

    // Generamos id unica
    const fileId = crypto.randomUUID();

    // Llamamos al model para subir el archivo a la base de datos
    const uploadedFile = await uploadFileModel({
        fileId,
        filename,
        size,
        userId,
        folderId,
    });

    return uploadedFile;
};
