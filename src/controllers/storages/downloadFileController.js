import path from 'path';
import fs from 'fs';

import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const downloadFileController = async (req, res, next) => {
    try {
        // Obtiene fileId desde la URL
        const { fileId } = req.params;

        // Obtiene userId desde el token o sesión
        const userId = req.user.id;

        // Busca el archivo en la DDBB
        const fileData = await selectFileByIdModel(fileId);
        if (!fileData) {
            throw generateErrorUtils(
                400,
                'NOT_FILE_FOUNDED',
                'No se ha encontrado ningun  archivo'
            );
        }

        // Ruta del archivo
        const filePath = path.join(
            'uploads',
            userId.toString(),
            fileData.fileName
        );

        // Verifica si el archivo existe
        if (!fs.access(filePath)) {
            throw generateErrorUtils(
                404,
                'FILE_NOT_FOUND',
                'El archivo no se ha encontrado en el servidor'
            );
        }

        // Descarga el archivo
        res.download(filePath);
    } catch (error) {
        next(error);
    }
};
