import path from 'path';
import { deleteFilesUtil, saveFilesUtils } from '../../utils/fileUtils.js';
import { createPathUtil } from '../utils/foldersUtils.js';

class FileService {
    static async uploadFiles(userPath, files) {
        try {
            // Crea la carpeta si no existe
            const fullPath = path.join(process.cwd(), userPath);
            await createPathUtil(fullPath);

            // Guarda archivos y devuelve los nombres
            const savedFiles = await saveFilesUtils(userPath, files);
            return { success: true, files: savedFiles };
        } catch (error) {
            throw new Error(`Error subiendo archivos: ${error.message}`);
        }
    }

    static async deleteFilesUtil(filePaths) {
        try {
            await deleteFilesUtil(filePaths);
            return {
                success: true,
                message: 'Archivos eliminados correctamente',
            };
        } catch (error) {
            throw new Error(`Error eliminando archivos: ${error.message}`);
        }
    }
}

export default FileService;
