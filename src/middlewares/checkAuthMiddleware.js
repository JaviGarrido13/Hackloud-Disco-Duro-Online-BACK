import generateErrorUtils from '../utils/helpersUtils.js';

export const checkAuthMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { fileId } = req.params;
        const file = await selectFileByIdModel(fileId);

        if (userId !== file[0].userId) {
            if (checkRole('admin'))
                throw generateErrorUtils(
                    403,
                    'NOT_ALLOWED',
                    'No tienes permisos suficientes'
                );
        }
        next();
    } catch (error) {
        next(error);
    }
};
