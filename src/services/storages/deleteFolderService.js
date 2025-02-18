import { deleteFolderByIdModel } from "../../models/folders/deleteFolderByIdModel.js";
import { deleteFolderUtil } from "../../utils/foldersUtils.js";

export const deleteFolderService = async (folderId, userId) => {

    // Llamar al model
    const folderData = await deleteFolderByIdModel(folderId, userId);

    // Llamar al util 
    await deleteFolderUtil(userId, folderData.name);


    return {message: 'Carpeta eliminada correctamente'};
};
