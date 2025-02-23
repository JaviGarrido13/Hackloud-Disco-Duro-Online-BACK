import path from 'path';

// Importamos el Model de busqueda de Archivo por id
import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';

// Importamos el Model de busqueda de Carpeta por id
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';

export const downloadFileController = async (req, res, next) => {
    try {
        // Obtenemos el id del archivo de los params
        const { id } = req.params;
        // Obtenemos el id del user
        const userId = req.user.id;
        // Busca el archivo en la DDBB
        const file = await selectFileByIdModel(id);

        let folderName = null;
        if (file.folderId !== null) {
            const { name } = await selectFolderByIdModel(file.folderId);
            folderName = name;
        }

        const fileName = file.name;

        const filePath = path.join(
            process.cwd(),
            'uploads',
            userId,
            folderName || '',
            fileName
        );
        res.status(200).download(filePath, fileName);
    } catch (error) {
        next(error);
    }
};
