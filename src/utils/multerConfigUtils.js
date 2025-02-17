import multer from 'multer';
import path from 'path';
import { createPathUtil, createUserPath } from './foldersUtils.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user.id;
        const folderName = req.body.folderName || null;

        // Crear el directorio del usuario
        createUserPath(userId)
            .then(() => {
                if (folderName) {
                    return createPathUtil(userId, folderName);
                }
                return path.join(process.cwd(), 'uploads', userId);
            })
            .then((uploadsDir) => {
                cb(null, uploadsDir);
            })
            .catch((error) => {
                cb(error);
            });
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Configurar límites y filtros
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'application/pdf',
            'text/plain',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'), false);
        }
    },
});
