// Importamos el errors
import {
    updateFileNameService,
    updateFolderNameService,
} from '../../services/storages/updateFileOrFolderService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

//Función controladora que se encarga de actualicar un producto
export const updateFileOrFolderController = async (req, res, next) => {
    try {
        // Obetenemos el id por params
        const { id } = req.params;
        // Obetenemos el nuevo nombre y el tipo de archivo del body
        const { name, type } = req.body;
        // Validamos si recibimos los datos
        if (!name || !type) {
            throw generateErrorUtils(
                400,
                'INVALID_REQUEST',
                'Name y type son requeridos'
            );
        }
        // Llamamos a la función que actualiza el archivo o carpeta
        let updatedItem;
        if (type === 'file') {
            updatedItem = await updateFileNameService(id, name);
        } else if (type === 'folder') {
            updatedItem = await updateFolderNameService(id, name);
        } else {
            throw generateErrorUtils(
                400,
                'INVALID_REQUEST',
                'Type debes ser "file" o "folder".'
            );
        }

        res.status(200).send({
            message: `El ${type} fue renombrado correctamente.`,
            data: updatedItem,
        });
    } catch (error) {
        next(error);
    }
};
