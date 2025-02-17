import generateErrorUtils from '../../utils/helpersUtils.js';

export const createFolderController = async (req, res, next) => {
    try {
        const { name } = req.body;
        const UserId = req.params.id;
        if (!name) {
            throw generateErrorUtils(
                401,
                'NAME_IS_REQUIRED',
                'El campo name es obligatorio'
            );
        }
        const folder = await createFolderService(name, UserId);

        res.status(200).send({
            satus: 'ok',
            message: 'Carpeta creada correctamente.',
            data: folder,
        });
    } catch (error) {
        next(error);
    }
};
