import crypto from 'crypto';
import { assignShareToken } from '../../models/storages/shareFileOrFolderModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';
import { FRONTEND_HOST } from '../../../env.js';

export const shareFileOrFolderController = async (req, res, next) => {
    try {
        const { id, type } = req.resource;
        let downloadUrl;

        const shareToken = crypto.randomUUID();
        if (type === 'file') {
            downloadUrl = `${FRONTEND_HOST}/storage/share/download/${shareToken}`;
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
            url: `${FRONTEND_HOST}/storage/share/link/${shareToken}`,

            download: downloadUrl,
        });
    } catch (error) {
        next(error);
    }
};
