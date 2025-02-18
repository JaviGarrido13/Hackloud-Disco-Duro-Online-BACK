import path from "path";
import fs from 'fs'
import crypto from 'crypto';
import { saveFolderUtil } from "../../utils/saveFolderUtil.js";
import { createNewFolderModel } from "../../models/folders/createNewFolderModel.js";

export const newFolderService = async (foldersName, foldersUserId, folders) => {

    const processedFolders = [];

    for (const folder of folders) {
        // Generar un ID único para el folder
        const foldersId = crypto.randomUUID();

        const folderSqlPath = path.join('src/uploads/folders', foldersUserId, foldersId);

        try {        
            // Verificar si la carpeta existe antes de crearla
            try {
                await fs.access(folderSqlPath);
                console.log(`La carpeta '${foldersName}' con ID ${foldersId} ya existe.`);
            } catch (error) {
                await fs.mkdir(folderSqlPath, { recursive: true });
                console.log(`Carpeta '${foldersName}' creada en: ${folderSqlPath}`);
            }

        // Guardad el folder en el sistema
        const folderSave = await saveFolderUtil(folderSqlPath, folder, 1000);

        // Guardar la informacion en la base de datos
        const result = await createNewFolderModel(foldersId, foldersName, foldersUserId);

        // Agregar la informacion del folder al array
        processedFolders.push({
            id: foldersId,
            folderSave,
            foldersUserId,
            result
        });
        } catch (error) {
            console.error('Error al crear la carpeta:', error);
            throw error;
        }
    }

    // Devuelve la lista de folders
    return processedFolders
}