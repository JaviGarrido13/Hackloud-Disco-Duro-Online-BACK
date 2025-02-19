import multer from 'multer';
import { saveAvatarUtil } from './avatarUtils.js';
import { saveFileUtil } from './fileUtils.js';
import { createUserPath, createPathUtil } from './foldersUtils.js';
import generateErrorUtils from './helpersUtils.js';
import { buffer } from 'stream/consumers';

// Configurar almacenamiento en memoria para procesamiento con Sharp
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
    fileFilter: async (req, file, cb) => {
        try {
            const allowedMimes = [
                'image/jpeg',
                'image/png',
                'image/jpg',
                'application/pdf',
                'text/plain',
            ];
            const isAvatar = req.originalUrl.includes('/users/avatar');

            if (
                isAvatar &&
                !['image/jpeg', 'image/png'].includes(file.mimetype)
            ) {
                return cb(
                    new Error(
                        'Solo se permiten imágenes JPG y PNG para avatares'
                    ),
                    false
                );
            }

            if (!isAvatar && !allowedMimes.includes(file.mimetype)) {
                return cb(new Error('Tipo de archivo no permitido'), false);
            }

            // Si no es un avatar, asegurar que la carpeta del usuario y la subcarpeta existen
            if (!isAvatar) {
                const userId = req.user.id;
                const folderName = req.body.folderName || null;
                await createUserPath(userId);
                if (folderName) {
                    await createPathUtil(userId, folderName);
                }
            }

            cb(null, true);
        } catch (error) {
            cb(error);
        }
    },
});

// Middleware para procesar y guardar archivos correctamente.
export const processFileUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            throw generateErrorUtils(
                400,
                'FILE_MISSING',
                'Debes enviar un archivo.'
            );
        }

        const userId = req.user.id;
        const isAvatar = req.originalUrl.includes('/users/avatar');
        const folderName = req.body.folderName || null;

        console.log('Subiendo archivos', {
            isAvatar,
            folderName,
            userId,
            filename: req.file.originalname,
            bufferSize: req.file.buffer.length,
        });

        if (isAvatar) {
            req.file.filename = await saveAvatarUtil(userId, req.file.buffer);
        } else {
            req.file.filename = await saveFileUtil(
                userId,
                folderName,
                req.file.originalname,
                req.file
            );
        }
        console.log('Archivo guardado correctamente', req.file.filename);

        next();
    } catch (error) {
        next(error);
    }
};
