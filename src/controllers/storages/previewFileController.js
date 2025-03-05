import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

// Importamos el Model de busqueda de Carpeta por id
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';

// Importamos utilidades para generar errores
import generateErrorUtils from '../../utils/helpersUtils.js';

export const previewFileController = async (req, res, next) => {
    try {
        // Obtenemos el recurso (archivo) que ya ha sido verificado por canDoItMiddleware
        const file = req.resource;
        
        // Verificamos que sea un archivo
        if (file.type !== 'file') {
            throw generateErrorUtils(
                400,
                'INVALID_RESOURCE_TYPE',
                'El recurso solicitado no es un archivo'
            );
        }
        
        // Obtenemos el nombre de la carpeta si el archivo está en una
        let folderName = null;
        if (file.folderId !== null) {
            const folder = await selectFolderByIdModel(file.folderId);
            folderName = folder.name;
        }
        
        const fileName = file.name;
        
        // Construimos la ruta del archivo
        const filePath = path.join(
            process.cwd(),
            'uploads',
            file.userId, // Usamos el userId del propietario del archivo
            folderName || '',
            fileName
        );
        
        // Verificamos que el archivo exista físicamente
        if (!fs.existsSync(filePath)) {
            throw generateErrorUtils(
                404,
                'FILE_NOT_FOUND',
                'El archivo físico no se encuentra en el servidor'
            );
        }
        
        // Obtenemos el tipo MIME del archivo
        const mimeType = mime.lookup(filePath) || 'application/octet-stream';
        
        // Configuramos los headers para la respuesta
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        res.setHeader('Content-Length', file.size);
        
        // Enviamos el archivo como respuesta
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        
    } catch (error) {
        next(error);
    }
};
