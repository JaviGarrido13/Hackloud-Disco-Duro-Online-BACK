// Importamos el model
import { selectFileByIdModel } from '../models/storages/selectFileByIdModel.js';
import { selectFolderByIdModel } from '../models/storages/selectFolderByIdModel.js';

// Importamos el errors
import generateErrorUtils from '../utils/helpersUtils.js';

// Middleware que verifica si puedes eliminar un archivo/carpeta
export const canDoItMiddleware = async (req, res, next) => {
    try {
        // Obtener el id del usuario
        const userId = req.user.id;
        // Obtener el id del archivo/carpeta
        const { id } = req.params;
        // Buscamos el archivo/carpeta
        const [file, folder] = await Promise.all([
            selectFileByIdModel(id),
            selectFolderByIdModel(id),
        ]);
        // Verificamos si el archivo/carpeta existe
        if (!file && !folder) {
            throw generateErrorUtils(
                404,
                'NOT_FOUND',
                'El archivo o carpeta no existe'
            );
        }
        const ownerId = file ? file.userId : folder.userId;
        if (userId !== ownerId) {
            throw generateErrorUtils(
                403,
                'INSUFFICIENT_PERMISSIONS',
                'Permisos insuficientes'
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};
