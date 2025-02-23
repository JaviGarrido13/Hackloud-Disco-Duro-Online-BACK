// Importamos el Service
import { uploadFilesService } from '../../services/storages/uploadFilesService.js';

// función controladora que se encarga de la subida de archivos
export const uploadFileController = async (req, res, next) => {
    try {
        // Obtenemos los datos del archivo subido
        const resource = req.resource;

        // Llamamos al service
        const savedFile = await uploadFilesService(resource);

        // Retorna la respuesta con los archivos guardados
        res.status(200).send({
            status: 'ok',
            message: `Archivos subidos correctamente a la carpeta`,
            data: savedFile,
        });
    } catch (error) {
        next(error);
    }
};
