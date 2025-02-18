// Importamos el model
import { selectFileByIdModel } from '../models/storages/selectFileByIdModel.js';

// Importamos el errors
import generateErrorUtils from '../utils/helpersUtils.js';

// Middleware que verifica si puedes eliminar un archivo
export const canDoItMiddleware = async (req, res, next) => {
    try {
        // Obtener el id del usuario
        const userId = req.user.id;
        // Obtener el id del archivo
        const { fileId } = req.params;
        // Buscamos el archivo
        const file = await selectFileByIdModel(fileId);
        if (!file) {
            throw generateErrorUtils(404, 'NOT_FOUND', 'El archivo no existe');
        }

        if (userId !== file.userId) {
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
