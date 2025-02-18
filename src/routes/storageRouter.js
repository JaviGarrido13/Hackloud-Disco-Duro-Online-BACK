//Importamos dependencias
import express from 'express';

//Importamos el controller

import { upload } from '../utils/multerConfigUtils.js';
import { uploadFileController } from '../controllers/storages/uploadFileController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController.js';
import { updateFileOrFolderController } from '../controllers/storages/updateFileOrFolderController.js';
import { deleteFileController } from '../controllers/storages/deleteFileController.js';
import { canDoItMiddleware } from '../middlewares/canDoItMiddleware.js';
import { createFolderController } from '../controllers/storages/createFolderController.js';
import { deleteFolderController } from '../controllers/storages/deleteFolderController.js';

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
    '/uploads/files/:id',
    authUserMiddleware,
    canDoItMiddleware,
    deleteFileController
);

// Ruta para actualizar un archivo o carpeta
storageRouter.put(
    '/storage/rename/:id',
    authUserMiddleware,
    updateFileOrFolderController
);

// Ruta para crear carpetas
storageRouter.post(
    '/storage/folder',
    authUserMiddleware,
    createFolderController
);

// Ruta para eliminar carpetas
storageRouter.delete(
    '/storage/folder/:id',
    authUserMiddleware,
    canDoItMiddleware,
    deleteFolderController
);
