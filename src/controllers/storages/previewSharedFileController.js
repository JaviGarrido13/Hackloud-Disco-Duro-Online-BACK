import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

// Importamos utilidades para generar errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos el modelo para obtener recursos por shareToken
import { getResourceByShareToken } from '../../models/storages/shareFileOrFolderModel.js';

// Importamos el modelo para obtener carpetas
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';

export const previewSharedFileController = async (req, res, next) => {
    try {
        // Obtenemos el shareToken de los params
        const { shareToken } = req.params;
        
        if (!shareToken) {
            throw generateErrorUtils(
                400,
                'SHARETOKEN_MISSING',
                'Falta shareToken en los params'
            );
        }
        
        // Obtenemos el recurso compartido
        const resource = await getResourceByShareToken(shareToken);
        
        // Verificamos que exista el recurso
        if (!resource) {
            throw generateErrorUtils(
                404,
                'NOT_FOUND',
                'El recurso compartido no existe'
            );
        }
        
        // Verificamos que sea un archivo
        if (resource.type !== 'file') {
            throw generateErrorUtils(
                400,
                'INVALID_RESOURCE_TYPE',
                'El recurso solicitado no es un archivo'
            );
        }
        
        // Obtenemos el nombre de la carpeta si el archivo está en una
        let folderName = null;
        if (resource.folderId !== null) {
            const folder = await selectFolderByIdModel(resource.folderId);
            folderName = folder.name;
        }
        
        const fileName = resource.name;
        
        // Construimos la ruta del archivo
        const filePath = path.join(
            process.cwd(),
            'uploads',
            resource.userId,
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
        res.setHeader('Content-Length', resource.size);
        
        // Enviamos el archivo como respuesta
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        
    } catch (error) {
        next(error);
    }
};
