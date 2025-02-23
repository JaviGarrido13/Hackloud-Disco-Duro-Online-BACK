import { getFilesInFolderModel } from '../../models/storages/shareFileOrFolderModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const listFilesInFolderController = async (req, res, next) => {
    try {
        // Obtenemos id del fodler desde params
        const { folderId } = req.params;
        // Llamamos al model
        const files = await getFilesInFolderModel(folderId);
        if (!files) {
            throw generateErrorUtils(
                404,
                'FILES_NOT_FOUND',
                'No se encontraron archivos en la carpeta'
            );
        }
        res.status(200).send({
            status: 'ok',
            message: files.length
                ? 'Archivos en la carpeta.'
                : 'No se encontraron archivos en la carpeta',
            data: files,
        });
    } catch (error) {
        next(error);
    }
};
