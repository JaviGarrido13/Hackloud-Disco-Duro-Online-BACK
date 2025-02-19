//Importamos dependencias
import express from 'express';

//Importamos el controller

import { processFileUpload, upload } from '../utils/multerConfigUtils.js';
import { uploadFileController } from '../controllers/storages/uploadFileController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController.js';
import { updateFileOrFolderController } from '../controllers/storages/updateFileOrFolderController.js';
import { deleteFileController } from '../controllers/storages/deleteFileController.js';
import { canDoItMiddleware } from '../middlewares/canDoItMiddleware.js';
import { createFolderController } from '../controllers/storages/createFolderController.js';
import { searchFilesController } from '../controllers/storages/searchFilesController.js';
import { deleteFolderController } from '../controllers/storages/deleteFolderController.js';
import { downloadFileController } from '../controllers/storages/downloadFileController.js';

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
    processFileUpload,
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

// Ruta para eliminar carpeta
storageRouter.delete(
    '/storage/folder/:id',
    authUserMiddleware,
    canDoItMiddleware,
    deleteFolderController
);

// Ruta para busqueda, filtros y ordenación
storageRouter.get('/storage/search', authUserMiddleware, searchFilesController);

// Ruta para descargar un archivo
storageRouter.get(
    '/uploads/files/:id',
    authUserMiddleware,
    downloadFileController
);
