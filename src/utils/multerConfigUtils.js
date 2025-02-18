import multer from 'multer';
import generateErrorUtils from './helpersUtils.js';
import { saveAvatarUtil } from './avatarUtils.js';

// Almacenamiento dinámico
const storage = multer.memoryStorage(); // Guardamos en memoria para procesar con Sharp

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'application/pdf',
            'text/plain',
        ];
        const isAvatar = req.originalUrl.includes('/users/avatar');
        if (isAvatar && !['image/jpeg', 'image/png'].includes(file.mimetype)) {
            return cb(
                new Error('Solo se permiten imágenes JPG y PNG para avatares'),
                false
            );
        }
        if (!isAvatar && !allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
    },
});

export const processAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            throw generateErrorUtils(
                400,
                'AVATAR_MISSING',
                'Debes enviar un avatar'
            );
        }

        const userId = req.user.id;
        req.file.filename = await saveAvatarUtil(userId, req.file.buffer); // Guardar el avatar

        next();
    } catch (error) {
        next(error);
    }
};
