import { createFolderService } from '../../services/storages/createFolderService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const createFolderController = async (req, res, next) => {
    try {
        const { folderName } = req.body;
        const userId = req.user.id;
        if (!folderName) {
            throw generateErrorUtils(
                401,
                'NAME_IS_REQUIRED',
                'El campo "FolderName" es obligatorio'
            );
        }
        // Llamamos al Service
        const folder = await createFolderService(folderName, userId);

        res.status(200).send({
            satus: 'ok',
            message: `Carpeta ${folderName} creada correctamente con id: "${folder}"`,
        });
    } catch (error) {
        next(error);
    }
};
