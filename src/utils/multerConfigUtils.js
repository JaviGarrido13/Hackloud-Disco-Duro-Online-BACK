import multer from 'multer';
import generateErrorUtils from './helpersUtils.js';

// Configurar almacenamiento en memoria para procesamiento con Sharp
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Límite de 20MB
    fileFilter: async (req, file, cb) => {
        try {
            const allowedMimes = [
                'image/jpeg',
                'image/png',
                'image/jpg',
                'image/gif',
                'image/svg+xml',
                'image/webp',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.ms-powerpoint',
                'text/plain',
                'application/zip',
                'application/x-rar-compressed',
                'application/x-tar',
            ];

            // Verificamos si es la ruta del avatar
            const isAvatar = req.originalUrl.includes('/users/avatar');

            // Si es avatar y su mimetype no es el permitido , devolvemos un error
            if (
                isAvatar &&
                ![
                    'image/jpeg',
                    'image/png',
                    'image/jpg',
                    'image/webp',
                ].includes(file.mimetype)
            ) {
                return cb(
                    new Error(
                        'Solo se permiten imágenes JPG, PNG, WEBP para avatares'
                    ),
                    false
                );
            }

            // Si no es avatar y su mimetype no es el permitido , devolvemos un error
            if (!isAvatar && !allowedMimes.includes(file.mimetype)) {
                return cb(new Error('Tipo de archivo no permitido'), false);
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
        // Verificamos que llegan req.file
        if (!req.file) {
            throw generateErrorUtils(
                400,
                'FILE_MISSING',
                'Debes enviar un archivo.'
            );
        }

        const userId = req.user.id;
        // Verificamos si es avatar, devuelve true/false
        const isAvatar = req.originalUrl.includes('/users/avatar');
        const folderName = req.body.folderName || null;

        // Si es avatar
        if (isAvatar) {
            // Creamos el objeto avatar y se manda en la req al siguiente controlador
            const avatar = {
                userId: userId,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                buffer: req.file.buffer,
            };
            req.avatar = avatar;
            next();
        } else {
            // Si no es avatar mandamos el recurso al controlador de subida de archivos normales
            const resource = {
                userId: userId,
                originalname: req.file.originalname,
                size: req.file.size,
                folderName: folderName || null,
                buffer: req.file.buffer,
            };
            req.resource = resource;
            next();
        }
    } catch (error) {
        next(error);
    }
};
