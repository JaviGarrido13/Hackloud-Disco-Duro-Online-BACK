import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import fs from 'fs/promises';

import { createPathUtil } from './foldersUtils.js';
import generateErrorUtils from './helpersUtils.js';

// Funcion para guardar una foto
export const savePhotoUtil = async (userAvatarPath, image, width) => {
    // Creamos el directorio
    await createPathUtil(path.join(process.cwd(), userAvatarPath));

    // Generar un nombre único
    const avatarFileName = `${crypto.randonUUID()}.jpg`;

    // Definir la ruta de la foto
    const avatarFilePath = path.join(
        process.cwd(),
        userAvatarPath,
        avatarFileName
    );

    // Procesamos la imagen con sharp
    const imgSharp = sharp(image.data);
    imgSharp.resize(width); // Redimensionamos la imagen
    imgSharp.jpeg({ quality: 100 }); // Convertir en la imagen a jpeg con calidad 100, el valor por defecto es 80
    await imgSharp.toFile(avatarFilePath); // Guardamos la imagen

    console.log('La imagen se a guardado correctamente en:', avatarFilePath);

    return avatarFileName;
};

// Función para eliminar una foto
export const deletePhotoUtil = async (avatarFilePath) => {
    await fs.unlink(avatarFilePath);

    if (error) {
        throw generateErrorUtils(
            500,
            'DELETE_PHOTO_ERROR',
            `La foto ${avatarFilePath} no se a podido Borrar`
        );
    }

    console.log(`La foto ${avatarFilePath} se a borrado correctamente`);
};
