// Importamos los models
import { deleteFileModel } from '../../models/storages/deleteFileModel.js';
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';

// Importamos el service
import { deleteFileUtil } from '../../utils/fileUtils.js';

// Función controladora que se encarga de eliminar un archivo
export const deleteFileController = async (req, res, next) => {
    try {
        // Obtenemos el id del user
        const userId = req.user.id;
        // Recuperamnos el archivo a eliminar
        const resource = req.resource;

        // Si el archivo esta en una carpeta recuperamos el nombre
        let folderName = null;
        if (resource.folderId !== null) {
            // Si el archivo pertenece a un folder, obtenemos el nombre
            const folder = await selectFolderByIdModel(resource.folderId);
            folderName = folder.name;
        }
        // Eliminamos el archivo de la base de datos
        await deleteFileModel(resource.id);

        // Eliminamos el archivo del sistema
        await deleteFileUtil(userId, resource.name, folderName);

        // Si todo fue bien , devolvemos un mensaje de éxito
        res.status(200).send({
            status: 'ok',
            message: 'Archivo eliminado con éxito',
        });
    } catch (error) {
        next(error);
    }
};
