import express from 'express';
import { upload } from '../utils/multerConfig.js';

import { uploadFileController } from '../controllers/storages/uploadFileController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';

export const filesRouter = express.Router();

// Ruta para subir archivos
filesRouter.post(
    '/upload/files',
    authUserMiddleware,
    upload.single('file'),
    uploadFileController
);

// Ruta para eliminar archivos
filesRouter.delete('/delete');
