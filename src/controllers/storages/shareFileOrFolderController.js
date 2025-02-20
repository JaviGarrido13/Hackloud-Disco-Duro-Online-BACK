import crypto from 'crypto';
import { assignShareToken } from '../../models/storages/shareFileOrFolderModel.js';

export const shareFileOrFolderController = async (req, res, next) => {
    try {
        const resource = req.resource;

        const shareToken = crypto.randomUUID();

        await assignShareToken(resource.id, resource.type, shareToken);

        res.status(200).send({
            status: 'ok',
            url: `http://localhost:3001/storage/share/link/${shareToken}`,
        });
    } catch (error) {
        next(error);
    }
};
