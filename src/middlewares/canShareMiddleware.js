import { selectFileByIdModel } from '../models/storages/selectFileByIdModel.js';
import { selectFolderByIdModel } from '../models/storages/selectFolderByIdModel.js';
import generateErrorUtils from '../utils/helpersUtils.js';

export const canShareMiddleware = async (req, res, next) => {
    try {
        // Obtener el ID del usuario
        const userId = req.user.id;

        // Obtener el ID del archivo/carpeta desde los parámetros
        const { resourceId } = req.params;

        // Obtener el type por body
        const { resourceType } = req.body;
        if (resourceType !== 'file' && resourceType !== 'folder') {
            throw generateErrorUtils(
                400,
                'INVALID_TYPE',
                'Type debe ser "file" o "folder"'
            );
        }

        // Buscar el archivo o carpeta en la base de datos
        const resource =
            resourceType === 'file'
                ? await selectFileByIdModel(resourceId)
                : await selectFolderByIdModel(resourceId);

        // Si el recurso no existe, devolver error
        if (!resource) {
            throw generateErrorUtils(
                404,
                'NOT_FOUND',
                'El archivo o carpeta no existe, comprueba el tipo'
            );
        }

        // Verificar si el usuario es el dueño del recurso
        if (resource.userId !== userId) {
            throw generateErrorUtils(
                403,
                'NOT_ALLOWED',
                'No eres dueno del archivo/carpeta que intentas compartir'
            );
        }

        req.resource = { ...resource, type: resourceType };
        next(); // El usuario tiene permisos, continuar
    } catch (error) {
        next(error);
    }
};
