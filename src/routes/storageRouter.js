//Importamos dependencias
import express from 'express';
import { upload } from '../utils/multerConfig.js';

//Importamos el controller

import { uploadFileController } from '../controllers/storages/uploadFileController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController.js';
import { createFolderController } from '../controllers/storages/createFolderController.js';

export const storageRouter = express.Router();
//Ruta para listar archivos y carpetas
storageRouter.get(
    '/files-folders',
    authUserMiddleware,
    listFilesAndFoldersControllers
);

// Ruta para subir archivos
storageRouter.post(
    '/upload/files',
    authUserMiddleware,
    upload.single('file'),
    uploadFileController
);

// Ruta para eliminar archivos
storageRouter.delete('/delete');

// Ruta para crear carpetas
storageRouter.post(
    '/create/folder',
    authUserMiddleware,
    createFolderController
);
