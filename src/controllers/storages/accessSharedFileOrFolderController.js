import { getFilesInFolderModel } from '../../models/storages/getFilesInFolderModel.js';
import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const accessSharedFileOrFolderController = async (req, res, next) => {
    try {
        const { shareToken } = req.params;

        // Buscar el recurso mediante token
        const sharedResource = await selectSharedFileOrFolderModel(shareToken);
        if (!sharedResource) {
            throw generateErrorUtils(
                404,
                'NOT_FOUND',
                'No se encontro el recurso compartido.'
            );
        }
        // Obtener el archivo o carpeta real
        const getResourceById =
            sharedResource.resourceType === 'file'
                ? selectFileByIdModel
                : selectFolderByIdModel;
        const resource = await getResourceById(sharedResource.resourceId);
        if (!resource) {
            throw generateErrorUtils(
                404,
                'RESOURCE_NOT_FOUND',
                'El recurso ya no está disponible.'
            );
        }

        // Si es carpeta, obtener los archivos de dentro
        let files = [];
        if (sharedResource.resourceType === 'folder') {
            files = await getFilesInFolderModel(resource.id);
        }
        res.status(200).send({
            resource,
            files,
        });
    } catch (error) {
        next(error);
    }
};
