import crypto from 'crypto';
import { assignShareToken } from '../../models/storages/shareFileOrFolderModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const shareFileOrFolderController = async (req, res, next) => {
    try {
        const { id, type } = req.resource;
        let downloadUrl;

        const shareToken = crypto.randomUUID();
        if (type === 'file') {
            downloadUrl = `http://localhost:5173/storage/share/download/${shareToken}`;
        }

        const result = await assignShareToken(id, type, shareToken);
        if (result === false) {
            throw generateErrorUtils(
                500,
                'ERROR_SHARE_TOKEN',
                'Error al actualizar el shareToken'
            );
        }

        res.status(200).send({
            status: 'ok',
            url: `http://localhost:5173/storage/share/link/${shareToken}`,

            download: downloadUrl,
        });
    } catch (error) {
        next(error);
    }
};
