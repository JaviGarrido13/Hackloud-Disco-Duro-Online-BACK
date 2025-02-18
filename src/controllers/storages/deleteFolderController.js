import { selectFolderByIdModel } from "../../models/storages/selectFolderByIdModel.js";
import { deleteFolderService } from "../../services/storages/deleteFolderService.js";
import generateErrorUtils from "../../utils/helpersUtils.js";


export const deleteFolderController = async (req, res, next) => {
    try {
        // Obtenemos el id de la carpeta
        const { id } = req.params;

        // Obtener el id del user
        const userId = req.user.id;

        // llamar al service
        const response = await deleteFolderService(id, userId);

        res.status(200).send({
            status: 'ok',
            message: response.message
        });
    } catch (error) {
        next(error)
    }
};
