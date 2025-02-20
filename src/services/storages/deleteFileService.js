// Importamos los utils
import { deleteFileUtil } from '../../utils/fileUtils.js';

// Importamos el modelo
import { deleteFileModel } from '../../models/storages/deleteFileModel.js';

// Llama al Service que se encarga de eliminar el archivo
export const deleteFileService = async (
    fileId,
    fileName,
    userId,
    folderName
) => {
    // Llama al modelo para eliminar el archivo
    const deleteModel = await deleteFileModel(fileId);
    // Llama al util que se encarga de borrar el archivo del sistema de archivos
    await deleteFileUtil(userId, fileName, folderName);

    return deleteModel;
};
