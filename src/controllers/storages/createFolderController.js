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
                'El campo "name" es obligatorio'
            );
        }
        const folder = await createFolderService(folderName, userId);

        res.status(200).send({
            satus: 'ok',
            message: 'Carpeta creada correctamente.',
            data: folder,
        });
    } catch (error) {
        next(error);
    }
};
