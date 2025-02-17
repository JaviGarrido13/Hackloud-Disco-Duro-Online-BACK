// Importamos el service
import { deleteFileService } from '../../services/storages/deleteFileService.js';

// Importamos el model
import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// Función controladora que se encarga de eliminar un archivo
export const deleteFileController = async (req, res, next) => {
    try {
        // Obtenemos el id del archivo de los params
        const { fileId } = req.params;
        // Obtenemos el id del user
        const userId = req.user.id;
        // Recogemos folderName si se especifica en el body
        const { folderName } = req.body;
        // Busca el archivo en la DDBB
        const file = await selectFileByIdModel(fileId);
        if (!file) {
            throw generateErrorUtils(
                404,
                'FILE_NOT_FOUND',
                'No se ha encontrado el archivo'
            );
        }
        const fileName = file[0].name;

        // Llamamos al Service
        await deleteFileService(fileId, fileName, userId, folderName);

        res.status(200).send({
            status: 'ok',
            message: 'Archivo eliminado con éxito',
        });
    } catch (error) {
        next(error);
    }
};
