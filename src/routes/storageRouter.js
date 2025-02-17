//Importamos dependencias
import express from 'express';
import { upload } from '../utils/multerConfig.js';

//Importamos el controller

import { uploadFileController } from '../controllers/storages/uploadFileController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController.js';
import { updateFileOrFolderController } from '../controllers/storages/updateFileOrFolderController.js';
import { deleteFileController } from '../controllers/storages/deleteFileController.js';
import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware.js';

export const storageRouter = express.Router();

//Ruta para listar archivos y carpetas
storageRouter.get(
    '/files-folders',
    authUserMiddleware,
    listFilesAndFoldersControllers
);

// Ruta para subir archivos
storageRouter.post(
    '/uploads/files',
    authUserMiddleware,
    upload.single('file'),
    uploadFileController
);

// Ruta para eliminar archivos
storageRouter.delete(
    '/delete/files/:fileId',
    authUserMiddleware,
    checkAuthMiddleware,
    deleteFileController
);

// Ruta para actualizar un archivo o carpeta
storageRouter.put(
    '/storage/rename/:id',
    authUserMiddleware,
    updateFileOrFolderController
);
