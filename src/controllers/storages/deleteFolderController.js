import { deleteFolderService } from '../../services/storages/deleteFolderService.js';

export const deleteFolderController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const response = await deleteFolderService(id, userId);

        res.status(200).json({
            status: 'ok',
            message: response.message,
        });
    } catch (error) {
        next(error);
    }
};
