import { searchFilesModel } from '../../models/storages/searchFilesModel.js';

export const searchFilesController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, minSize, maxSize, folderId, orderBy, orderDirection } =
            req.query;

        const files = await searchFilesModel(userId, {
            name,
            minSize,
            maxSize,
            folderId,
            orderBy,
            orderDirection,
        });

        res.status(200).json({
            status: 'ok',
            message: 'Búsqueda realizada correctamente',
            data: files,
        });
    } catch (error) {
        next(error);
    }
};
