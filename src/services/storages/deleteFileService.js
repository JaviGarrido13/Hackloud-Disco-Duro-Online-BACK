// Importamos los utils
import { deleteFileUtil } from '../../utils/fileUtils.js';

// Importamos el modelo
import { deleteFileModel } from '../../models/storages/deleteFileModel.js';

// Servicio que se encarga de eliminar el archivo
export const deleteFileService = async (
    fileId,
    fileName,
    userId,
    folderName
) => {
    // Llamamos al modelo para eliminar el archivo
    const deleteModel = await deleteFileModel(fileId);
    // Llamamos al util que se encarga de borrar el archivo del sistema de archivos
    await deleteFileUtil(userId, fileName, folderName);

    return deleteModel;
};
