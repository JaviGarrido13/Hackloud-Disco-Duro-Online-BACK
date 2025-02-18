import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { createPathUtil, createUserPath } from './foldersUtils.js';
import generateErrorUtils from './helpersUtils.js';

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
        const isAvatar = req.originalUrl.includes('/users/avatar');

        if (isAvatar) {
            const avatarPath = path.join(
                process.cwd(),
                'uploads',
                'avatars',
                `${userId}.png`
            );

            // Convertir y optimizar la imagen con sharp
            await sharp(req.file.buffer)
                .resize(200, 200)
                .toFormat('png')
                .toFile(avatarPath);

            req.file.filename = `${userId}.png`;
        } else {
            // Processar archivos normales (guardar en el sistema de archivos)
            const userPath = path.join(process.cwd(), 'uploads', userId);
            await createUserPath(userId);

            const filePath = path.join(
                userPath,
                `${Date.now()}-${req.file.originalname}`
            );
            await fs.promises.writeFile(filePath, req.file.buffer);

            req.file.filename = path.basename(filePath);
        }
        next();
    } catch (error) {
        next(error);
    }
};
