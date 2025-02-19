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
        const avatarDir = path.join(
            process.cwd(),
            'uploads',
            userId,
            'avatars'
        );

        await fs.mkdir(avatarDir, { recursive: true });

        const avatarFileName = `avatar_${Date.now()}.png`;

        const avatarPath = path.join(avatarDir, avatarFileName);

        await sharp(fileBuffer)
            .resize(250, 250)
            .toFormat('png')
            .toFile(avatarPath);

        return avatarFileName;
    } catch (error) {
        console.log('Error al guardar el avatar', error);
        throw generateErrorUtils(
            500,
            'AVATAR_SAVE_FAILED',
            'Error al guardar el avatar.'
        );
    }
};

// Eliminar el avatar anterior
export const deleteAvatarUtil = async (userId, currentAvatar) => {
    try {
        if (!currentAvatar) return;

        const avatarDir = path.join(
            process.cwd(),
            'uploads',
            userId,
            'avatars'
        );

        // Eliminar todas las versiones del avatar
        const files = await fs.readdir(avatarDir);
        await Promise.all(
            files
                .filter((file) => file.startsWith('avatar_'))
                .map((file) => fs.unlink(path.join(avatarDir, file)))
        );

        console.log(`♻️ Eliminados ${files.length} avatares antiguos`);
    } catch (error) {
        console.error(`❌ Error eliminando avatar: ${error.message}`);
        console.error('Stack trace:', error.stack);
        throw error;
    }
};
