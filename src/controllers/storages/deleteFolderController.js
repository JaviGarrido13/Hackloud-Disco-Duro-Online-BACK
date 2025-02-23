import { deleteFolderByIdModel } from '../../models/storages/deleteFolderByIdModel.js';
import { deleteFolderUtil } from '../../utils/foldersUtils.js';

export const deleteFolderController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const folder = req.resource;
        // Sabemos que la carpeta existe porqué el middleware anterior ya la busca y determina que es de este usuario
        // Eliminamos la carpeta de la base de datos
        await deleteFolderByIdModel(folder.id, userId);

        // Eliminamos la capreta del sistema
        await deleteFolderUtil(userId, folder.name);

        res.status(200).send({
            status: 'ok',
            message: `Carpeta ${folder.name} eliminada correctamente`,
        });
    } catch (error) {
        next(error);
    }
};
