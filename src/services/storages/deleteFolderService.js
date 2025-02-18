import { deleteFolderModel } from '../../models/storages/deleteFolderModel.js';
import { deleteFolderUtil } from '../../utils/foldersUtils.js';

export const deleteFolderService = async (folderId, userId) => {
    // Primero eliminar la carpeta de la base de datos
    const folderData = await deleteFolderModel(folderId, userId);

    // Luego, eliminar la carpeta y sus archivos del sistema de archivos
    await deleteFolderUtil(userId, folderData.name);

    return { message: 'Carpeta eliminada correctamente' };
};
