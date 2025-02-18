import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { createPathUtil } from './foldersUtils.js';
import generateErrorUtils from './helpersUtils.js';

// crear carpeta para almacenar avatares si no existe
export const getAvatarPath = async (userId) => {
    const avatarFolderPath = path.join(
        process.cwd(),
        'uploads',
        userId,
        'avatars'
    );
    await createPathUtil(userId, 'avatars');
    return avatarFolderPath;
};

// Guardar el avatar procesado
export const saveAvatarUtil = async (userId, fileBuffer) => {
    try {
        if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
            throw generateErrorUtils(
                400,
                'INVALID_FILE_BUFFER',
                'El archivo no tiene un buffer válido.'
            );
        }

        const avatarDir = path.join(
            process.cwd(),
            'uploads',
            userId,
            'avatars'
        );
        console.log('AvatarDir', avatarDir);

        await fs.mkdir(avatarDir, { recursive: true });

        const avatarPath = path.join(avatarDir, `${userId}.png`);

        console.log('Guardando avatar en:', avatarPath);

        await sharp(fileBuffer)
            .resize(250, 250)
            .toFormat('png')
            .toFile(avatarPath);

        return `${userId}.png`;
    } catch (error) {
        console.error('Error en saveAvatarUtil:', error);
        throw generateErrorUtils(
            500,
            'AVATAR_SAVE_FAILED',
            'Error al guardar el avatar.'
        );
    }
};

// Eliminar el avatar anterior
export const deleteAvatarUtil = async (userId, avatarFileName) => {
    try {
        if (!avatarFileName) return;
        const avatarPath = path.join(
            process.cwd(),
            'uploads',
            userId,
            'avatars',
            avatarFileName
        );
        await fs.unlink(avatarPath);
        console.log('Avatar eliminado correctamente');
    } catch (error) {
        throw generateErrorUtils(
            500,
            'DELETE_LAST_AVATAR_FAILED',
            'Error al eliminar el avatar anterior'
        );
    }
};
