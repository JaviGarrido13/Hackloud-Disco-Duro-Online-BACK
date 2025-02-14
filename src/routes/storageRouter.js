//Importamos dependencias
import express from 'express';

//Importamos el controller
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController.js';
import { updateFileOrFolderController } from '../controllers/storages/updateFileOrFolderController.js';

export const storageRouter = express.Router();

//Ruta para listar archivos y carpetas
storageRouter.get(
    '/storage/list',
    authUserMiddleware,
    listFilesAndFoldersControllers
);

// Ruta para actualizar un archivo o carpeta
storageRouter.put(
    '/storage/rename/:id',
    authUserMiddleware,
    updateFileOrFolderController
);
