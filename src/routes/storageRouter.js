//Importamos dependencias
import express from 'express';

//Importamos Middlewares y Utils
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { canDoItMiddleware } from '../middlewares/canDoItMiddleware.js';
import { processFileUpload, upload } from '../utils/multerConfigUtils.js';

//Importamos el controller
import { createFolderController } from '../controllers/storages/createFolderController.js';
import { deleteFolderController } from '../controllers/storages/deleteFolderController.js';
import { shareFileOrFolderController } from '../controllers/storages/shareFileOrFolderController.js';
import { getSharedFilesController } from '../controllers/storages/getSharedFilesController.js';
import { downloadSharedFileController } from '../controllers/storages/downloadSharedFileController.js';
import { uploadFileController } from '../controllers/storages/uploadFileController.js';
import { deleteFileController } from '../controllers/storages/deleteFileController.js';
import { updateFileOrFolderController } from '../controllers/storages/updateFileOrFolderController.js';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController.js';
import { searchFilesController } from '../controllers/storages/searchFilesController.js';
import { downloadFileController } from '../controllers/storages/downloadFileController.js';
import { listFilesInFolderController } from '../controllers/storages/listFilesInFolderController.js';
import { previewFileController } from '../controllers/storages/previewFileController.js';
import { previewSharedFileController } from '../controllers/storages/previewSharedFileController.js';

export const storageRouter = express.Router();

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
    canDoItMiddleware,
    updateFileOrFolderController
);

//Ruta para listar archivos y carpetas
storageRouter.get(
    '/storage',
    authUserMiddleware,
    listFilesAndFoldersControllers
);

//Ruta para listar archivos dentro de una carpeta
storageRouter.get(
    '/storage/folder/:folderId',
    authUserMiddleware,
    listFilesInFolderController
);

// Ruta para busqueda, filtros y ordenación
storageRouter.get('/storage/search', authUserMiddleware, searchFilesController);

// Ruta para compartir archivos o carpetas
storageRouter.post(
    '/storage/share/:id',
    authUserMiddleware,
    canDoItMiddleware,
    shareFileOrFolderController
);

// Ruta para obtener tus archivos compartidos
storageRouter.get('/storage/share/link/:shareToken', getSharedFilesController);

// Ruta para descargar archivos compartidos
storageRouter.get(
    '/storage/share/download/:shareToken',
    downloadSharedFileController
);

// Ruta para descargar un archivo
storageRouter.get(
    '/download/files/:id',
    authUserMiddleware,
    downloadFileController
);

// Ruta para previsualizar un archivo
storageRouter.get(
    '/files/:id/preview',
    authUserMiddleware,
    canDoItMiddleware,
    previewFileController
);

// Ruta para previsualizar archivos compartidos
storageRouter.get(
    '/storage/share/preview/:shareToken',
    previewSharedFileController
);
