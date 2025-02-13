//Importamos dependencias
import express from 'express';

//Importamos el controller

import { authUserMiddleware } from '../middlewares/authUserMiddleware';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController';

export const storageRouter = express.Router();
//Ruta para listar archivos y carpetas
router.get("/storage/list",authUserMiddleware, listFilesAndFoldersControllers)
