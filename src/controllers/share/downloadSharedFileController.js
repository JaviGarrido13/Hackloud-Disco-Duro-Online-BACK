import { getSharedFileService } from '../../services/storages/getSharedFileService.js';

export const downloadSharedFileController = async (req, res, next) => {
    try {
        const { shareToken } = req.params;
        const { filePath, fileName } = await getSharedFileService(shareToken);
        res.download(filePath, fileName);
    } catch (error) {
        next(error);
    }
};
