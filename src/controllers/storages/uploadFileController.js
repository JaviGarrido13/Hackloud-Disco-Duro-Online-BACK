// Importamos el servbice
import { uploadFilesService } from '../../services/storages/uploadFilesService.js';

// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

// función controladora que se encarga de la subida de archivos
export const uploadFileController = async (req, res, next) => {
    try {
        // Verifica si los archivos están presentes en la solicitud
        if (!req.file) {
            throw generateErrorUtils(
                400,
                'NO_FILE_UPLOADED',
                'No has subido ningun archivo'
            );
        }
        // Obtenemos los datos del archivo subido
        const { originalname, filename, size } = req.file;
        // Obtenemos el id del usuario que subió el archivo
        const userId = req.user.id;
        // Recogemos el nombre de la carpeta a la que pertenece
        const folderName = req.body.folderName || null;

        // Llamamos al service
        const savedFile = await uploadFilesService(
            userId,
            { originalname, filename, size },
            folderName
        );

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
