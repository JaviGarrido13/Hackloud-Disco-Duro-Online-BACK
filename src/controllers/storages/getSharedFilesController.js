import { getSharedResourceByToken } from '../../services/storages/shareFileOrFolderService.js';
import { getFilePath } from '../../utils/fileUtils.js';

export const getSharedFilesController = async (req, res, next) => {
    try {
        const { shareToken } = req.params;
        const { resource, files, permission } = await getSharedResourceByToken(
            shareToken
        );
        if (resource.type === 'file') {
            return res
                .status(200)
                .json({ resource, canDownload: permission === 'write' });
        }

        res.status(200).send({
            resource,
            files,
            canDownload: permission === 'write',
        });
    } catch (error) {
        next(error);
    }
};

export const downloadSharedFileController = async (req, res, next) => {
    try {
        const { shareToken } = req.params;
        const { resource, permission } = await getSharedResourceByToken(
            shareToken
        );
        console.log(resource, permission);

        if (resource.resourceType !== 'file' || permission !== 'write') {
            return res.status(403).json({
                error: 'FORBIDDEN',
                message: 'No tienes permisos para descargar carpetas.',
            });
        }

        const { filePath, fileName } = await getFilePath(resource.id);
        res.download(filePath, fileName);
    } catch (error) {
        next(error);
    }
};
