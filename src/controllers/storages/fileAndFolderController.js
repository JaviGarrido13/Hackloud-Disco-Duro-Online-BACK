//Importamos el servicio
import { listFilesAndFoldersService } from '../../services/storages/fileAndFolderService.js';

//Funcion controladora que se encarga de listar archivos y carpetas
export const listFilesAndFoldersControllers = async (req, res, next) => {
    try {
        //LLamamos al servicio que obtiene la lista de archivos y carpetas.
        const data = await listFilesAndFoldersService();

        res.status(200).send({
            status: 'ok',
            message: 'Lista de archivos y carpetas encontrada',
            data,
        });
    } catch (error) {
        next(error);
    }
};
