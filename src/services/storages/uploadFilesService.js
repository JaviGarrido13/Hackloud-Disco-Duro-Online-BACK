// Importamos dependencias
import crypto from 'crypto';

// Importamos el model
import { selectFileByName } from '../../models/storages/selectFileByName.js';
import { selectFolderByName } from '../../models/storages/selectFolderByName.js';
import { uploadFileModel } from '../../models/storages/uploadFileModel.js';

// Importamos service
import { createFolderService } from './createFolderService.js';
import { saveFileUtil } from '../../utils/fileUtils.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

// Service que se encarga de guardar el archivo
export const uploadFilesService = async (resource) => {
    // Destructuring del resource
    const { userId, originalname, size, folderName, buffer } = resource;
    console.log(originalname);
    const file = await selectFileByName(originalname);
    if (file) {
        throw generateErrorUtils(
            409,
            'FILE_ALREADY_EXISTS',
            'Ya existe un archivo con ese nombre'
        );
    }

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
