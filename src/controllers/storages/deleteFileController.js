import { deleteFileService } from '../../services/storages/deleteFileService.js';

import generateErrorUtils from '../../utils/helpersUtils.js';

export const deleteFileController = async (req, res, next) => {
    try {
        const { fileId } = req.params;
        const { userId } = req.user.id;
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

        // Llamamos al Service
        await deleteFileService(fileId, userId, folderName);

        res.status(200).send('Archivo eliminado correctamente.');
    } catch (error) {
        res.status(500).send('Error al eliminar el archivo.');
    }
};
