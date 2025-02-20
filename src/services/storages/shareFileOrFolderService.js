import crypto from 'crypto';
import { getFilesInFolderModel } from '../../models/storages/getFilesInFolderModel.js';
import { selectFileByIdModel } from '../../models/storages/selectFileByIdModel.js';
import { selectFolderByIdModel } from '../../models/storages/selectFolderByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';
import {
    getResourceByShareTokenModel,
    shareFileOrFolderModel,
} from '../../models/storages/shareFileOrFolderModel.js';

export const shareFileOrFolderService = async (
    ownerId,
    resource,
    permission
) => {
    const token = crypto.randomUUID();
    await shareFileOrFolderModel(
        resource.id,
        resource.type,
        ownerId,
        permission,
        token
    );
    return `http://localhost:3001/storage/share/link/${token}`;
};

export const getSharedResourceByToken = async (shareToken) => {
    console.log('ShareToken', shareToken);
    const sharedResource = await getResourceByShareTokenModel(shareToken);
    if (!sharedResource) {
        throw generateErrorUtils(
            404,
            'RESOURCE_NOT_FOUND',
            'No se encontro el recurso'
        );
    }

    const getResourceById =
        sharedResource.resourceType === 'file'
            ? selectFileByIdModel
            : selectFolderByIdModel;
    const resource = await getResourceById(sharedResource.resourceId);
    if (!resource) {
        throw generateErrorUtils(
            404,
            'NOT_FOUND_SHARED_RESOURCE',
            'No se encontró el recurso compartido'
        );
    }

    const files =
        sharedResource.resourceType === 'folder'
            ? await getFilesInFolderModel(resource.id)
            : [];

    return { resource, files, permission: sharedResource.permission };
};
