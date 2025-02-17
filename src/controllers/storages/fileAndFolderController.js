//Importamos el servicio
import { listFilesAndFoldersService } from '../../services/storages/fileAndFolderService.js';

//Funcion controladora que se encarga de listar archivos y carpetas
export const listFilesAndFoldersControllers = async (req, res, next) => {
    try {
        // Recuperamos el id del usuario
        const userId = req.user.id;

        // Recuperamos folderId por si queremos listar dentro de una carpeta
        const folderId = req.body.folderId;

        //LLamamos al servicio que obtiene la lista de archivos y carpetas.
        const data = await listFilesAndFoldersService(userId, folderId || null);

        res.status(200).send({
            status: 'ok',
            message: data.length
                ? 'Lista de archivos y carpetas encontrada'
                : 'No se encontraron archivos y carpetas en esta carpeta',
            count: data.length,
            data,
        });
    } catch (error) {
        next(error);
    }
};
