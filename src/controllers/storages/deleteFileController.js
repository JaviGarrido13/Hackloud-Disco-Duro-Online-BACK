// Importamos el service
import { deleteFileService } from '../../services/storages/deleteFileService.js';

// Importamos el model
import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';

// Función controladora que se encarga de eliminar un archivo
export const deleteFileController = async (req, res, next) => {
    try {
        // Obtenemos el id del archivo de los params
        const { id } = req.params;
        // Obtenemos el id del user
        const userId = req.user.id;
        // Busca el archivo en la DDBB
        const file = await selectFileByIdModel(id);
        // Si el archivo esta en una carpeta recuperamos el nombre
        let folderName = null;
        if (file.folderId) {
            // Si el archivo pertenece a un folder, obtenemos el nombre
            const folder = await selectFolderByIdModel(file.folderId);
            folderName = folder.name;
        }

        const fileName = file.name;
        // Llamamos al Service
        await deleteFileService(id, fileName, userId, folderName);

        res.status(200).send({
            status: 'ok',
            message: 'Archivo eliminado con éxito',
        });
    } catch (error) {
        next(error);
    }
};
