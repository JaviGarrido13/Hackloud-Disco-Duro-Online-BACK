import { getSharedFileService } from '../../services/storages/getSharedFileService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const downloadSharedFileController = async (req, res, next) => {
    try {
        const { shareToken } = req.params;
        if (!shareToken) {
            throw generateErrorUtils(
                400,
                'SHARETOKEN_MISSING',
                'Falta shareToken en los params'
            );
        }

        const { filePath, fileName } = await getSharedFileService(shareToken);
        res.download(filePath, fileName);
    } catch (error) {
        next(error);
    }
};
