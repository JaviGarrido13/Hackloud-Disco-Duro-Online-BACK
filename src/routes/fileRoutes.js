import express from 'express';
import multer from 'multer';
import generateErrorUtils from '../utils/helpersUtils.js';

export const filesRouter = express.Router();
// Para recibir archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para subir archivos
router.post('/uploads', upload.array('files'), async (req, res) => {
    try {
        // Verifica si los archivos están presentes en la solicitud
        if (!req.files || req.files.length === 0) {
            throw generateErrorUtils(
                400,
                'NO_FILES_UPLOADED',
                'No se han subido archivos'
            );
        }

        // Obtiene el id de usuario desde el req.body o con autenticación
        const userId = req.body.userId || req.user?.id;

        if (!userId) {
            throw generateErrorUtils(
                400,
                'MISSING_USER_ID',
                'No se ha encontrado el ID de usuario'
            );
        }

        // Crea la ruta de carpeta para cada usuario
        const userPath = `uploads/${userId}`;

        // Sube los archivos usando FileService
        const result = await FileService.uploadFiles(userPath, req.files);

        // Retorna la respuesta con los archivos guardados
        res.status(200).send({
            status: 'ok',
            message: `Archivos subidos correctamente a la carpeta: ${userPath}`,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Ruta para eliminar archivos
router.delete('/delete', async (req, res) => {
    try {
        // Lista de archivos para eliminar
        const { filePaths } = req.body;
        if (!filePaths || filePaths.length === 0) {
            throw generateErrorUtils(
                400,
                'NO_FILES_FOUND',
                'No se han encontrado archivos que eliminar'
            );
        }

        const result = await FileService.deleteFiles(filePaths);
        res.status(200).send({
            status: 'ok',
            message: 'Archivos eliminados correctamente',
        });
    } catch (error) {
        next(error);
    }
});
