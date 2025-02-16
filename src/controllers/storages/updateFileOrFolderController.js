// Importamos los services
import { renameSchema } from '../../schemas/storage/renameSchema.js';
import {
    updateFileNameService,
    updateFolderNameService,
} from '../../services/storages/updateFileOrFolderService.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//Función controladora que se encarga de actualicar un producto
export const updateFileOrFolderController = async (req, res, next) => {
    try {
        // Obetenemos el id del item por params
        const { id } = req.params;
        // Obetenemos el nuevo nombre y el tipo de archivo del body
        const { name, type } = req.body;
        // Validamos los datos recibidos
        await validateSchemaUtil(renameSchema, req.body);
        // Llamamos a la función que actualiza el archivo o carpeta
        let updatedItem;
        switch (type) {
            case 'file':
                updatedItem = await updateFileNameService(id, name);
                break;
            case 'folder':
                updatedItem = await updateFolderNameService(id, name);
                break;
            default:
                throw generateErrorUtils(
                    400,
                    'INVALID_REQUEST',
                    'Type debe ser "file" o "folder".'
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
