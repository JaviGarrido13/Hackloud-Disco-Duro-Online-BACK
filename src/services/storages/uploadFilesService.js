// Importamos dependencias
import crypto from 'crypto';

// Importamos el model
import { selectFolderByName } from '../../models/storages/selectFolderByName.js';
import { uploadFileModel } from '../../models/storages/uploadFileModel.js';

// Importamos service
import { createFolderService } from './createFolderService.js';
import { saveFileUtil } from '../../utils/fileUtils.js';

// Service que se encarga de guardar el archivo
export const uploadFilesService = async (resource) => {
    // Destructuring del resource
    const { userId, originalname, size, folderName, buffer } = resource;
    console.log(originalname);

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

    // Guardamos el recurso en local
    const fileName = await saveFileUtil(
        userId,
        folderName,
        originalname,
        buffer
    );

    // Generamos id unica
    const fileId = crypto.randomUUID();

    // Llamamos al model para subir el archivo a la base de datos
    const uploadedFile = await uploadFileModel({
        fileId,
        fileName,
        size,
        userId,
        folderId,
    });

    return uploadedFile;
};
