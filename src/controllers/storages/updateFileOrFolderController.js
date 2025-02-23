// Importamos los services
import {
    updateFileNameService,
    updateFolderNameService,
} from '../../services/storages/updateFileOrFolderService.js';
// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

//Función controladora que se encarga de actualicar un producto
export const updateFileOrFolderController = async (req, res, next) => {
    try {
        // Recuperamos el recurso
        const resource = req.resource;
        console.log('Resource: ', resource);
        // Obetenemos el nuevo nombre del body
        const { name } = req.body;
        // Llamamos a la función que actualiza el archivo o carpeta
        let updatedItem;
        switch (resource.type) {
            case 'file':
                updatedItem = await updateFileNameService(resource, name);
                break;
            case 'folder':
                updatedItem = await updateFolderNameService(resource, name);
                break;
            default:
                throw generateErrorUtils(
                    400,
                    'INVALID_REQUEST',
                    'Type debe ser "file" o "folder".'
                );
        }

        res.status(200).send({
            message: `El ${
                resource.type === 'file' ? 'archivo' : 'carpeta'
            } fue renombrado correctamente a ${name}.`,
            data: updatedItem,
        });
    } catch (error) {
        next(error);
    }
};
