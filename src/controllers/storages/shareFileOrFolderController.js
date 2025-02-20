import { shareFileOrFolderService } from '../../services/storages/shareFileOrFolderService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const shareFileOrFolderController = async (req, res, next) => {
    try {
        // Recogemos datos del usuario
        const ownerId = req.user.id;

        const { permission } = req.body;
        const resource = req.resource;

        if (!permission) {
            throw generateErrorUtils(
                400,
                'PERMISSIONS_MISSING',
                'El campo "permission" es requerido'
            );
        }

        const shareUrl = await shareFileOrFolderService(
            ownerId,
            resource,
            permission
        );

        res.status(200).send({
            status: 'ok',
            url: shareUrl,
        });
    } catch (error) {
        next(error);
    }
};
